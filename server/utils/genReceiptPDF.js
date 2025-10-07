import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateReceiptPDF = ({
  parentName,
  studentName,
  amount,
  status,
  paymentRecordId,
  paymentMethod = "Online Transfer",
  description = "PTA Fees",
}) => {
  // Generate a receipt number if not provided
  const receiptNo = `SMK-RCP${paymentRecordId}`;
  const pdfPath = path.join(
    __dirname,
    "../receipts",
    `${studentName}-receipt-${receiptNo}.pdf`
  );

  // Ensure the receipts directory exists
  const receiptsDir = path.dirname(pdfPath);
  if (!fs.existsSync(receiptsDir)) {
    fs.mkdirSync(receiptsDir, { recursive: true });
  }

  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(fs.createWriteStream(pdfPath));

  // Header with border
  doc.rect(40, 40, 515, 80).stroke();

  // Add the actual logo from assets/logo.png
  doc.image(path.join(__dirname, "../assets/logo.png"), 50, 50, { width: 50 });

  // School name and details
  doc.fontSize(18).font("Helvetica-Bold").text("PIBG SMK SURIA PERDANA", 110, 55);

  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Jalan Parit Semarang, 86400 Parit Raja, Johor", 110, 75);

  doc.text("Tel: 07-453 2156 | Email: smksuria@edu.my", 110, 88);
  doc.text("Registration No: 199501234567", 110, 101);

  // Receipt title and number
  doc.fontSize(16).font("Helvetica-Bold").text("OFFICIAL RECEIPT", 40, 140);

  // Receipt No
  doc
    .fontSize(12)
    .font("Helvetica")
    .text(`Receipt No: ${receiptNo || `RCP${Date.now().toString().slice(-6)}`}`, 400, 140, { align: "right" });

  // Add more space above the Date field
  const dateYPosition = 170; // Adjust this value to increase spacing

  // Date
  doc
    .fontSize(12)
    .font("Helvetica")
    .text(`Date: ${new Date().toLocaleDateString("en-GB")}`, 400, dateYPosition, { align: "right" });

  // Horizontal line
  doc.moveTo(40, 180).lineTo(555, 180).stroke();

  // Received from section
  doc.fontSize(12).font("Helvetica-Bold").text("Received from:", 40, 200);

  doc.font("Helvetica").text(parentName, 150, 200);

  // Student details section
  doc.font("Helvetica-Bold").text("Student Name:", 40, 225);

  doc.font("Helvetica").text(studentName, 150, 225);

  // Amount section with box
  doc.font("Helvetica-Bold").text("Amount:", 40, 250);

  doc.rect(120, 245, 100, 25).stroke();
  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text(`RM ${parseFloat(amount).toFixed(2)}`, 125, 252);

  // Amount in words
  doc.fontSize(12).font("Helvetica-Bold").text("Amount in words:", 40, 285);

  const amountInWords = convertAmountToWords(parseFloat(amount));
  doc.font("Helvetica").text(amountInWords, 40, 305, { width: 500 });

  // Payment details
  doc.font("Helvetica-Bold").text("Payment for:", 40, 340);

  doc.font("Helvetica").text(description, 150, 340);

  doc.font("Helvetica-Bold").text("Payment Method:", 40, 365);

  doc.font("Helvetica").text(paymentMethod, 150, 365);

  doc.font("Helvetica-Bold").text("Payment Status:", 40, 390);

  doc
    .font("Helvetica")
    .fillColor(status === "Paid" ? "green" : "red")
    .text(status.toUpperCase(), 150, 390);

  // Reset color
  doc.fillColor("black");

  // Signature section
  doc.moveTo(40, 450).lineTo(555, 450).stroke();

  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("Authorized Signature:", 40, 470);

  // Signature line
  doc.moveTo(180, 485).lineTo(350, 485).stroke();

  doc.fontSize(10).font("Helvetica").text("(Bursar/Finance Officer)", 200, 495);

  // Office stamp area
  doc.rect(400, 460, 120, 60).stroke();
  doc.fontSize(10).text("OFFICE STAMP", 425, 485);

  // Footer
  doc
    .fontSize(8)
    .font("Helvetica-Oblique")
    .text(
      "This is a computer generated receipt and is valid without signature.",
      40,
      570
    );

  doc.text("Please retain this receipt for your records.", 40, 580);

  // Duplicate notice
  doc.fontSize(10).font("Helvetica-Bold").text("STUDENT COPY", 450, 570);

  // Border around entire receipt
  doc.rect(30, 30, 535, 570).stroke();

  doc.end();
  return pdfPath;
};

// Helper function to convert amount to words
const convertAmountToWords = (amount) => {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const thousands = ["", "Thousand", "Million"];

  if (amount === 0) return "Zero Ringgit Only";

  const [ringgit, sen] = amount.toString().split(".");
  let words = "";

  // Convert ringgit part
  const ringgitNum = parseInt(ringgit);
  if (ringgitNum > 0) {
    words +=
      convertNumberToWords(ringgitNum, ones, teens, tens, thousands) +
      " Ringgit";
  }

  // Convert sen part
  if (sen && parseInt(sen) > 0) {
    const senNum = parseInt(sen.padEnd(2, "0"));
    if (words) words += " and ";
    words +=
      convertNumberToWords(senNum, ones, teens, tens, thousands) + " Sen";
  }

  return words + " Only";
};

const convertNumberToWords = (num, ones, teens, tens, thousands) => {
  if (num === 0) return "";

  let result = "";
  let thousandIndex = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      let chunkWords = "";

      const hundred = Math.floor(chunk / 100);
      const remainder = chunk % 100;

      if (hundred > 0) {
        chunkWords += ones[hundred] + " Hundred ";
      }

      if (remainder >= 20) {
        chunkWords += tens[Math.floor(remainder / 10)] + " ";
        if (remainder % 10 > 0) {
          chunkWords += ones[remainder % 10] + " ";
        }
      } else if (remainder >= 10) {
        chunkWords += teens[remainder - 10] + " ";
      } else if (remainder > 0) {
        chunkWords += ones[remainder] + " ";
      }

      if (thousands[thousandIndex]) {
        chunkWords += thousands[thousandIndex] + " ";
      }

      result = chunkWords + result;
    }

    num = Math.floor(num / 1000);
    thousandIndex++;
  }

  return result.trim();
};

export default generateReceiptPDF;
