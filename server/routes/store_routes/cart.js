import express from "express";
import Cart from "../../models/store_models/cart.js";
import Product from "../../models/store_models/product.js";
import { auth } from "../../middleware/auth.js"; // Correct middleware import


const router = express.Router();

// 🛒 Get current user's cart
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );
    res.status(200).json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// // ➕ Add item to cart
// router.post("/", auth, async (req, res) => {
//   const { productId, quantity = 1, size } = req.body;
//   try {
//     let cart = await Cart.findOne({ userId: req.user._id });

//     if (!cart) {
//       cart = new Cart({ userId: req.user._id, items: [] });
//     }

//     const existingItem = cart.items.find(
//       (item) => item.productId.toString() === productId && item.size === size
//     );

//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       cart.items.push({ productId, quantity, size });
//     }

//     await cart.save();
//     res.status(200).json(cart);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to add to cart" });
//   }
// });

// ➕ Add item to cart
router.post("/", auth, async (req, res) => {
  const { productId, quantity = 1, size } = req.body;

  try {
    // ✅ Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Check stock
    if (product.stock <= 0) {
      return res.status(400).json({ message: `${product.name} is out of stock` });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    // ✅ Check if item already in cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (existingItem) {
      // 🚨 Prevent exceeding stock
      if (existingItem.quantity + quantity > product.stock) {
        return res.status(400).json({
          message: `Only ${product.stock} available for ${product.name}`,
        });
      }
      existingItem.quantity += quantity;
    } else {
      // 🚨 Prevent adding if request > stock
      if (quantity > product.stock) {
        return res.status(400).json({
          message: `Only ${product.stock} available for ${product.name}`,
        });
      }
      cart.items.push({ productId, quantity, size });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Failed to add to cart" });
  }
});

// 🔁 Update cart item (quantity or size)
router.put("/:productId", auth, async (req, res) => {
  const { quantity, size } = req.body;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    if (quantity !== undefined) item.quantity = quantity;
    if (size) item.size = size;

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to update item" });
  }
});

// ❌ Remove item from cart
router.delete("/:productId", auth, async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item" });
  }
});

// 🧹 Clear the entire cart
router.delete("/", auth, async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart" });
  }
});

export default router;
