import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

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
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5002;

// ===== Middleware =====
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));

// ===== Seed Database (Optional) =====
if (process.argv.includes("--seed")) {
  seedRooms().then(() => {
    console.log("Seeding completed. Exiting...");
    process.exit();
  });
}

// ===== Static Folders =====
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/receipts", express.static(path.join(__dirname, "receipts")));
app.use("/store-receipt", express.static(path.join(process.cwd(), "store-receipt")));
app.use("/uploads/products", express.static(path.join(__dirname, "uploads/products")));
app.use("/product-images", express.static(path.join(process.cwd(), "product-images")));

// ===== Routes =====
app.get("/", (req, res) => res.send("SMK Server is Running 🚀"));
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/pibg", pibgRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/chat", chatRoutes);

// ===== Error Handlers =====
app.use((req, res) => res.status(404).json({ message: `Route not found: ${req.originalUrl}` }));
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ===== Connect to MongoDB =====
connectDB();

// ===== Create HTTP Server and Attach Socket.io =====
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// ===== Socket.io Authentication =====
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("No token provided"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded; // attach decoded token
    next();
  } catch (err) {
    console.error("❌ Invalid token", err.message);
    next(new Error("Invalid token"));
  }
});

// ===== Manage Online Users =====
const onlineUsers = new Map();

io.on("connection", (socket) => {
  const { id: userId, role } = socket.user;
  onlineUsers.set(userId, socket.id);

  console.log(`✅ ${role} connected: ${userId} (${socket.id})`);

  // Join private room
  socket.join(userId);

  // Admins join a shared admin room (both principal and admin)
  if (role === "principal" || role === "admin") {
    socket.join("admin_room");
    console.log(`🛡 ${role} joined admin_room`);
  }

  // Optional: handle dynamic room join from frontend
  socket.on("join", (room) => {
    socket.join(room);
    console.log(`${role} joined room: ${room}`);
  });

  // ===== Listen for send_message =====
  socket.on("send_message", ({ receiver, message, text }) => {
    // Construct message object
    const msg =
      message ||
      ({
        _id: Date.now().toString(),
        text,
        sender: role === "principal" || role === "admin" ? "admin" : "user",
        senderId: userId,
        timestamp: new Date(),
      });

    // Ensure sender field exists
    if (!msg.sender) {
      msg.sender = role === "principal" || role === "admin" ? "admin" : "user";
    }

    // ===== Routing logic =====
    if (role !== "principal" && role !== "admin" && receiver === "admin") {
      // User → Admin room
      io.to("admin_room").emit("receive_message", msg);
    } else if ((role === "principal" || role === "admin") && receiver) {
      // Admin → specific user
      io.to(receiver).emit("receive_message", msg);
    }

    // Echo back to sender for instant UI update
    socket.emit("receive_message", msg);
  });

  // ===== Handle message deletions =====
  socket.on("message_deleted", ({ messageId, receiverId }) => {
    console.log("🗑 Message delete event from:", userId, "→", receiverId);

    // Notify specific user if admin deletes
    if ((role === "principal" || role === "admin") && receiverId) {
      io.to(receiverId).emit("message_deleted", { messageId });
    }

    // Always notify all admins
    io.to("admin_room").emit("message_deleted", { messageId });
  });

  // ===== Handle disconnect =====
  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    console.log(`❌ ${role} disconnected: ${userId}`);
  });
});


server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
