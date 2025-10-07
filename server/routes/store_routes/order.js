import express from "express";
import Order from "../../models/store_models/order.js";
import { auth } from "../../middleware/auth.js";
import fs from "fs";
import path from "path";
import multer from "multer";
import cart from "../../models/store_models/cart.js";
import Product from "../../models/store_models/product.js"; // make sure path is correct

const orderRoutes = express.Router();

// Multer setup for store-receipt uploads
const receiptDir = path.join(process.cwd(), "store-receipt");
if (!fs.existsSync(receiptDir)) {
  fs.mkdirSync(receiptDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, receiptDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// ========== CONTROLLERS ==========

// @desc Create a new order
orderRoutes.post("/", auth, upload.single("receiptImage"), async (req, res) => {
  try {
    const { paymentNarration, userNote, phoneNumber } = req.body;
    const receiptImage = req.file ? `store-receipt/${req.file.filename}` : null;

    if (!receiptImage || !phoneNumber) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const userCart = await cart.findOne({ userId: req.user._id });

    if (!userCart || userCart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    await userCart.populate("items.productId");

    const validItems = userCart.items.filter(
      (item) => item.productId && item.productId.isActive
    );

    if (validItems.length === 0) {
      return res.status(400).json({ message: "No valid products in cart." });
    }

    const cartItems = validItems.map((item) => ({
      productId: item.productId._id,
      productName: item.productId.name,
      quantity: item.quantity,
      unitPrice: item.productId.price,
    }));

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );

    const newOrder = await Order.create({
      user: req.user._id,
      phoneNumber,
      cartItems,
      totalAmount,
      receiptImage,
      paymentNarration,
      userNote,
    });

    // Optional: clear cart after placing order
    await cart.findOneAndDelete({ userId: req.user._id });

    res.status(201).json({ message: "Order submitted.", order: newOrder });
  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// ======================
// USER: GET OWN ORDERS
// ======================
orderRoutes.get("/my-orders", auth, async (req, res) => {
  try {
    console.log("🧾 Fetching orders for:", req.user._id);
    const orders = await Order.find({ user: req.user._id })
  .populate("user", "name email") // populate only name and email
  .sort({ createdAt: -1 });
    console.log("📦 Orders found:", orders.length);
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching your orders:", err);
    res.status(500).json({ message: "Error fetching your orders." });
  }
});


// ======================
// USER: DELETE OWN PENDING ORDER
// ======================
orderRoutes.delete("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) return res.status(404).json({ message: "Order not found." });

    if (order.status !== "pending") {
      return res.status(400).json({
        message: "Only pending orders can be deleted.",
      });
    }

    await order.deleteOne();
    res.json({ message: "Order deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// ======================
// ADMIN: GET ALL ORDERS
// ======================
orderRoutes.get("/", auth, async (req, res) => {
  try {
    // // Optional: restrict to admins only using req.user.role === 'admin'
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching orders.", error: err.message });
  }
});

// ======================
// ADMIN: APPROVE ORDER
// ======================
orderRoutes.patch("/:id/approve", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found." });

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Order is already processed." });
    }

    // 🔥 Decrement stock for each product in the order
    for (const item of order.cartItems) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity, sold: +item.quantity },
      });
    }

    // ✅ Update order status
    order.status = "approved";
    order.approval = {
      approvedBy: req.user._id,
      date: new Date(),
    };

    await order.save();

    res.json({ message: "Order approved & stock updated.", order });
  } catch (err) {
    console.error("Error approving order:", err);
    res
      .status(500)
      .json({ message: "Error approving order.", error: err.message });
  }
});


// ======================
// ADMIN: REJECT ORDER
// ======================
orderRoutes.patch("/:id/reject", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found." });

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Order is already processed." });
    }

    order.status = "rejected";
    order.approval = {
      approvedBy: req.user._id,
      date: new Date(),
    };

    await order.save();
    res.json({ message: "Order rejected.", order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error rejecting order.", error: err.message });
  }
});

export default orderRoutes;





// import express from "express";
// import Order from "../../models/store_models/order.js";
// import { auth } from "../../middleware/auth.js";
// import fs from "fs";
// import path from "path";
// import multer from "multer";
// import cart from "../../models/store_models/cart.js";

// const orderRoutes = express.Router();

// // Multer setup for store-receipt uploads
// const receiptDir = path.join(process.cwd(), "store-receipt");
// if (!fs.existsSync(receiptDir)) {
//   fs.mkdirSync(receiptDir, { recursive: true });
// }
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, receiptDir),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });
// const upload = multer({ storage });

// // ========== CONTROLLERS ==========

// // @desc Create a new order
// orderRoutes.post("/", auth, upload.single("receiptImage"), async (req, res) => {
//   try {
//     const { paymentNarration, userNote, phoneNumber } = req.body;
//     const receiptImage = req.file ? req.file.path : null;

//     if (!receiptImage || !phoneNumber) {
//       return res.status(400).json({ message: "Missing required fields." });
//     }

//     const userCart = await cart.findOne({ userId: req.user._id });

//     if (!userCart || userCart.items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty." });
//     }

//     await userCart.populate("items.productId");

//     const validItems = userCart.items.filter(
//       (item) => item.productId && item.productId.isActive
//     );

//     if (validItems.length === 0) {
//       return res.status(400).json({ message: "No valid products in cart." });
//     }

//     const cartItems = validItems.map((item) => ({
//       productId: item.productId._id,
//       productName: item.productId.name,
//       quantity: item.quantity,
//       unitPrice: item.productId.price,
//     }));

//     const totalAmount = cartItems.reduce(
//       (sum, item) => sum + item.quantity * item.unitPrice,
//       0
//     );

//     const newOrder = await Order.create({
//       user: req.user._id,
//       phoneNumber,
//       cartItems,
//       totalAmount,
//       receiptImage,
//       paymentNarration,
//       userNote,
//     });

//     // Optional: clear cart after placing order
//     await cart.findOneAndDelete({ userId: req.user._id });

//     res.status(201).json({ message: "Order submitted.", order: newOrder });
//   } catch (err) {
//     console.error("Order creation failed:", err);
//     res.status(500).json({ message: "Server error.", error: err.message });
//   }
// });

// // ======================
// // USER: GET OWN ORDERS
// // ======================
// orderRoutes.get("/my-orders", auth, async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id }).sort({
//       createdAt: -1,
//     });
//     res.json(orders);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error fetching your orders.", error: err.message });
//   }
// });

// // ======================
// // USER: DELETE OWN PENDING ORDER
// // ======================
// orderRoutes.delete("/:id", auth, async (req, res) => {
//   try {
//     const order = await Order.findOne({
//       _id: req.params.id,
//       user: req.user._id,
//     });

//     if (!order) return res.status(404).json({ message: "Order not found." });

//     if (order.status !== "pending") {
//       return res.status(400).json({
//         message: "Only pending orders can be deleted.",
//       });
//     }

//     await order.deleteOne();
//     res.json({ message: "Order deleted successfully." });
//   } catch (err) {
//     res.status(500).json({ message: "Server error.", error: err.message });
//   }
// });

// // ======================
// // ADMIN: GET ALL ORDERS
// // ======================
// orderRoutes.get("/", auth, async (req, res) => {
//   try {
//     // // Optional: restrict to admins only using req.user.role === 'admin'
//     const orders = await Order.find({})
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error fetching orders.", error: err.message });
//   }
// });

// // ======================
// // ADMIN: APPROVE ORDER
// // ======================
// orderRoutes.patch("/:id/approve", auth, async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (!order) return res.status(404).json({ message: "Order not found." });

//     if (order.status !== "pending") {
//       return res.status(400).json({ message: "Order is already processed." });
//     }

//     order.status = "approved";
//     order.approval = {
//       approvedBy: req.user._id,
//       date: new Date(),
//     };

//     await order.save();
//     res.json({ message: "Order approved.", order });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error approving order.", error: err.message });
//   }
// });

// // ======================
// // ADMIN: REJECT ORDER
// // ======================
// orderRoutes.patch("/:id/reject", auth, async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (!order) return res.status(404).json({ message: "Order not found." });

//     if (order.status !== "pending") {
//       return res.status(400).json({ message: "Order is already processed." });
//     }

//     order.status = "rejected";
//     order.approval = {
//       approvedBy: req.user._id,
//       date: new Date(),
//     };

//     await order.save();
//     res.json({ message: "Order rejected.", order });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error rejecting order.", error: err.message });
//   }
// });

// export default orderRoutes;
