import express from "express";
import multer from "multer";
import Pibg from "../models/pibg.js";
import dotenv from "dotenv";
import sendPaymentStatusMail from "../utils/mailer.js";
import fs from "fs";


dotenv.config();
const pibgRoutes = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

/**
 * @desc Parent uploads payment
 * @route POST /api/pibg
 */
pibgRoutes.post("/", upload.single("receipt"), async (req, res) => {
  try {
    const {
      email,
      parentName,
      students: studentsJson,
      amount,
      date,
    } = req.body;
    const receipt = req.file?.path;

    // Parse students data
    let students = [];
    try {
      students = JSON.parse(studentsJson || "[]");
    } catch (err) {
      return res.status(400).json({ message: "Invalid students data format." });
    }

    // Validate required fields
    if (!email || !parentName || !students || students.length === 0 || !amount || !date || !receipt) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate students array length (1-3)
    if (students.length < 1 || students.length > 3) {
      return res.status(400).json({ message: "Please provide 1 to 3 students." });
    }

    // Validate each student
    const validForms = ["1", "2", "3", "4", "5"];
    const validClasses = ["ELIT", "MUSYTARI", "UTARID", "URANUS", "ZUHRAH", "ZUHAL"];
    
    for (let student of students) {
      if (!student.name || !student.form || !student.class) {
        return res.status(400).json({ message: "All student fields are required (name, form, class)." });
      }
      if (!validForms.includes(student.form)) {
        return res.status(400).json({ message: `Invalid form value for student: ${student.name}` });
      }
      if (!validClasses.includes(student.class)) {
        return res.status(400).json({ message: `Invalid class value for student: ${student.name}` });
      }
    }

    const payment = await Pibg.create({
      email,
      parentName,
      students,
      amount,
      date,
      receipt,
    });

    // Generate student names for email (e.g., "1. John\n2. Jane\n3. Alex")
    const studentNames = students.map((s, i) => `${i + 1}. ${s.name}`).join("\n");

    // Send to parent
    await sendPaymentStatusMail({
      to: email,
      parentName,
      studentName: studentNames,
      amt: amount,
      status: "Pending",
      paymentRecordId: payment._id.toString(),
      mailType: "parent",
    });

    // Send to admin
    await sendPaymentStatusMail({
      to: process.env.SCHOOL_ADMIN_EMAIL,
      parentName,
      studentName: studentNames,
      amt: amount,
      status: "Pending",
      paymentRecordId: payment._id.toString(),
      mailType: "admin",
      receiptPath: receipt, // uploaded proof
    });

    res.status(201).json({ message: "Payment submitted successfully", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting payment" });
  }
});

/**
 * @desc Treasurer views all payments
 * @route GET /api/pibg
 */
pibgRoutes.get("/", async (req, res) => {
  try {
    const payments = await Pibg.find().sort({ date: -1 });
    res.status(200).json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching payments" });
  }
});

/**
 * @desc Treasurer verifies or updates status of a payment
 * @route PATCH /api/pibg/:id
 */
pibgRoutes.patch("/:id", async (req, res) => {
  try {
    const payment = await Pibg.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.status = req.body.status || payment.status;
    await payment.save();

    // Send email notification
    if (payment.email) {
      try {
        // Get student names from the students array or fall back to childName
        let studentName = payment.childName || "Student";
        if (payment.students && payment.students.length > 0) {
          studentName = payment.students.map((s, i) => `${i + 1}. ${s.name}`).join("\n");
        }

        await sendPaymentStatusMail({
          to: payment.email,
          parentName: payment.parentName,
          studentName,
          amt: payment.amount,
          status: payment.status,
          paymentRecordId: payment._id,
        });
      } catch (mailErr) {
        console.error("Error sending email:", mailErr);
      }
    }

    res.status(200).json({ message: "Payment status updated successfully", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating payment" });
  }
});

/**
 * @desc Admin deletes a payment
 * @route DELETE /api/pibg/:id
 */
pibgRoutes.delete('/:id', async (req, res) => {
  try {
    const payment = await Pibg.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    // Delete the uploaded receipt file if it exists
    if (payment.receipt) {
      fs.unlink(payment.receipt, (err) => {
        if (err) {
          console.error('Error deleting receipt file:', err);
        }
      });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting payment' });
  }
});

/**
 * @desc Admin downloads all payments (CSV-style data)
 * @route GET /api/pibg/report
 */
pibgRoutes.get("/report", async (req, res) => {
  try {
    const payments = await Pibg.find();
    const csv = [
      ["Parent Name", "Student Names", "Forms", "Classes", "Amount", "Date", "Status"],
      ...payments.map((p) => {
        // Handle new format (students array) and legacy format (childName, form, class)
        let studentNames = p.childName || "N/A";
        let forms = p.form || "N/A";
        let classes = p.class || "N/A";

        if (p.students && p.students.length > 0) {
          studentNames = p.students.map((s, i) => `${i + 1}. ${s.name}`).join("\n");
          forms = p.students.map((s) => `Form ${s.form}`).join("\n");
          classes = p.students.map((s) => `${s.class}`).join("\n");
        }

        return [
          p.parentName,
          studentNames,
          forms,
          classes,
          p.amount,
          p.date.toISOString().split("T")[0],
          p.status,
        ];
      }),
    ]
      .map((row) => row.join(","))
      .join("\n");

    res.setHeader("Content-Disposition", "attachment; filename=payment_report.csv");
    res.setHeader("Content-Type", "text/csv");
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate report" });
  }
});

export default pibgRoutes;
