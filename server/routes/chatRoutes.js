import express from "express";
import Chat from "../models/chat.js";
import { auth } from "../middleware/auth.js";
import mongoose from "mongoose";

const router = express.Router();

// Roles allowed to access all chats / send as admin
const adminRoles = ["admin", "principal", "school_admin"];

/**
 * 📨 Send message
 * - Normal users send message to admin
 * - Admin / Principal / School Admin can send message to any user (via userId in body)
 */
router.post("/send", auth, async (req, res) => {
  try {
    const { text, sender, userId: targetUserId } = req.body;

    if (!text || !sender) {
      return res.status(400).json({ error: "Text and sender are required" });
    }

    // If admin is sending message, ensure targetUserId is provided
    if (sender === "admin" && !targetUserId) {
      return res.status(400).json({ error: "User ID required for admin messages" });
    }

    // Find or create chat for that specific user
    let chat = await Chat.findOne({ userId: sender === "admin" ? targetUserId : req.user._id });

    if (!chat) {
      chat = new Chat({
        userId: sender === "admin" ? targetUserId : req.user._id,
        messages: [],
      });
    }

    const message = {
      text,
      sender,
      timestamp: new Date(),
      isRead: sender === "admin", // mark admin messages as read
    };

    chat.messages.push(message);
    await chat.save();

    res.status(200).json(chat);
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * 💬 Get chat for logged-in user
 */
router.get("/my-chat", auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const chat = await Chat.findOne({ userId });
        res.status(200).json(chat || { messages: [] });
    } catch (error) {
        console.error("Error fetching chat:", error);
        res.status(500).json({ message: "Failed to load chat" });
    }
});

/**
 * 📬 Get all user chats (Admin / Principal / School Admin only)
 */
router.get("/all", auth, async (req, res) => {
    try {
        if (!adminRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const chats = await Chat.find()
            .populate("userId", "name email")
            .sort({ updatedAt: -1 });

        res.status(200).json(chats);
    } catch (error) {
        console.error("Error fetching all chats:", error);
        res.status(500).json({ message: "Failed to load chats" });
    }
});

/**
 * 📩 Get a specific user's chat (Admin / Principal / School Admin only)
 */
router.get("/:userId", auth, async (req, res) => {
    try {
        if (!adminRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const chat = await Chat.findOne({ userId: req.params.userId }).populate(
            "userId",
            "name email"
        );

        res.status(200).json(chat || { messages: [] });
    } catch (error) {
        console.error("Error fetching user chat:", error);
        res.status(500).json({ message: "Failed to load chat" });
    }
});

// Delete a message completely
// ✅ Allow both message sender and admin/principal to delete permanently
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    // Find the chat document that contains this message
    const chat = await Chat.findOne({ "messages._id": req.params.id });
    if (!chat) return res.status(404).json({ error: "Message not found" });

    // Get the message
    const msg = chat.messages.id(req.params.id);

    // Authorization check
   if (
  (msg.senderId && msg.senderId.toString() !== req.user.id) &&
  !["admin", "principal"].includes(req.user.role)
) {
  return res.status(403).json({ error: "Forbidden" });
}


    // 🧹 Remove message permanently from messages array
    chat.messages = chat.messages.filter(
      (m) => m._id.toString() !== req.params.id
    );

    await chat.save();

    res.json({ success: true, message: "Message deleted permanently" });
  } catch (err) {
    console.error("❌ Delete message error:", err);
    res.status(500).json({ error: "Server error" });
  }
});



/**
 * 📨 Mark all messages as read
 * - Admin can mark all user messages as read
 * - Users can mark all admin messages as read
 */
router.patch("/mark-all-read", auth, async (req, res) => {
    try {
        const isAdmin = adminRoles.includes(req.user.role);

        if (isAdmin) {
            // Admin marks all user messages as read
            await Chat.updateMany(
                {},
                { $set: { "messages.$[msg].isRead": true } },
                { arrayFilters: [{ "msg.isRead": false, "msg.sender": "user" }] }
            );
        } else {
            // Normal user marks all admin messages as read in their own chat
            await Chat.updateOne(
                { userId: req.user._id },
                { $set: { "messages.$[msg].isRead": true } },
                { arrayFilters: [{ "msg.isRead": false, "msg.sender": { $in: adminRoles } }] }
            );
        }

        res.status(200).json({ message: "All messages marked as read" });
    } catch (error) {
        console.error("Failed to mark messages as read:", error);
        res.status(500).json({ message: "Failed to mark messages as read" });
    }
});

export default router;
