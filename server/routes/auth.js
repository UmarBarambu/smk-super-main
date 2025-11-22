import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import { auth, roleCheck } from "../middleware/auth.js";
import nodemailer from "nodemailer";

dotenv.config();
const authRoutes = express.Router();

// Utility: Send Email
const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};

// Utility: Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// 🚨 Password Recovery: Request Reset
authRoutes.post("/password-reset-request", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 3600000; // 1h
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request for SMK SURIA PERDANA",
      text: `Click here to reset your password:\n\n${resetLink}\n\nIf you did not request this, ignore.`,
    });

    res.status(200).json({ message: "Password reset link sent to your email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🚨 Reset Password
authRoutes.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ error: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch Profile
authRoutes.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update own profile (all authenticated users)
authRoutes.put("/profile", auth, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // If changing email, ensure uniqueness
    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ error: "Email already in use" });
      user.email = email;
    }

    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(200).json({ user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error("Error updating profile:", err);
    if (err.name === "ValidationError") return res.status(400).json({ error: err.message });
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin/Principal Profile
authRoutes.get("/admin/profile", auth, roleCheck("principal", "school_admin"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email role");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching admin profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin/Principal Edit Profile
authRoutes.put("/admin/profile", auth, roleCheck("principal", "school_admin"), async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const allowedRoles = [
      "school_admin",
      "principal",
      "class_teacher",
      "regular_teacher",
      "room_supervisor",
      "pta_treasurer",
      "store_admin",
    ];

    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role assignment" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(200).json({
      message: "Profile updated",
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Error updating admin profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔐 Login Route for Admin Dashboard
authRoutes.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // Allow additional admin-type roles to access admin login
    const allowedAdminRoles = [
      "principal",
      "school_admin",
      "room_supervisor",
      "pta_treasurer",
      "store_admin",
    ];

    if (!user || !allowedAdminRoles.includes(user.role)) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    const token = generateToken(user);
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔐 Login Route (All users)
authRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    const token = generateToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// 👨‍🎓 Signup Route (Teacher + JPN PPD Individual only)
authRoutes.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const allowedRoles = ["class_teacher", "regular_teacher", "jpn_ppd_individual"];
    const userRole = role ? role.toLowerCase() : "student";

    if (!allowedRoles.includes(userRole)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role: userRole });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// 👑 Create Users (Admin/Principal only)
authRoutes.post("/create-user", auth, roleCheck("principal", "school_admin"), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const allowedRoles = [
      "school_admin",
      "principal",
      "class_teacher",
      "regular_teacher",
      "room_supervisor",
      "pta_treasurer",
      "store_admin",
      "pibg",
      "rooms",
      "shop",
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role assignment" });
    }


    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    console.error("Create user error:", err);
    // Mongoose validation error (e.g., invalid enum)
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    // Duplicate key (email)
    if (err.code && err.code === 11000) {
      return res.status(400).json({ error: "Email already in use" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// 👀 Admin: Get all users (principal / school_admin)
authRoutes.get(
  "/admin/users",
  auth,
  roleCheck("principal", "school_admin"),
  async (req, res) => {
    try {
      // Exclude principals from the admin user list per admin UI requirement
      const users = await User.find({ role: { $ne: "principal" } })
        .select("name email role createdAt")
        .sort({ createdAt: -1 });
      res.status(200).json({ users });
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// 🗑 Admin: Delete a user (principal / school_admin)
authRoutes.delete(
  "/admin/users/:id",
  auth,
  roleCheck("principal", "school_admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Missing user id" });

      // Prevent admin from deleting themselves
      if (req.user.id === id) {
        return res.status(400).json({ error: "You cannot delete your own account" });
      }

      const user = await User.findById(id);
      if (!user) return res.status(404).json({ error: "User not found" });

      // Do not allow deleting users with role 'principal'
      if (user.role === "principal") {
        return res.status(403).json({ error: "Cannot delete user with role 'principal'" });
      }

      await User.deleteOne({ _id: id });
      res.status(200).json({ message: "User deleted" });
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
// 🚨 One-time Setup Superadmin
authRoutes.post("/setup-superadmin", async (req, res) => {
  const { name, email, password, role, setupKey } = req.body;

  if (setupKey !== process.env.SETUP_KEY) {
    return res.status(403).json({ error: "Unauthorized setup access" });
  }

  const allowedRoles = ["school_admin", "principal"];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ error: "Invalid role for setup" });
  }

  if (await User.findOne({ email })) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role });
  await user.save();

  const token = generateToken(user);
  res.status(201).json({ message: "Superuser created", user, token });
});

// 🔄 Validate Token
authRoutes.get("/validate", auth, (req, res) => {
  res.status(200).json({ message: "Token is valid", user: req.user });
});

export default authRoutes;
