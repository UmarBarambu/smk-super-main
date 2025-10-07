import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

import connectDB from "./config/db.js";
import seedRooms from "./config/seedRooms.js";

// Routes
import bookingRoutes from "./routes/booking.js";
import authRoutes from "./routes/auth.js";
import roomRoutes from "./routes/rooms.js";
import pibgRoutes from "./routes/pibg.js";
import productRoutes from "./routes/store_routes/products.js";
import cartRoutes from "./routes/store_routes/cart.js";
import orderRoutes from "./routes/store_routes/order.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(morgan("dev")); // Logs method, URL, status, response time
app.use(express.json());
app.use(cors({ origin: "*" }));

// Seed DB (optional)
if (process.argv.includes("--seed")) {
  seedRooms().then(() => {
    console.log("Seeding completed. Exiting...");
    process.exit();
  });
}

// Root route
app.get("/", (req, res) => {
  res.send("SMK Server is Running 🚀");
});

// Static folders
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/receipts", express.static(path.join(__dirname, "receipts")));
app.use("/store-receipt", express.static(path.join(process.cwd(), "store-receipt")));
app.use("/uploads/products", express.static(path.join(__dirname, "uploads/products")));
app.use( "/product-images", express.static(path.join(process.cwd(), "product-images")));
// app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));


// app.use("/products", express.static(path.join(__dirname, "uploads/products")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/pibg", pibgRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
