import express from "express";
import multer from "multer";
import path from "path";
import Product from "../../models/store_models/product.js";
import { auth, roleCheck } from "../../middleware/auth.js";
import fs from "fs";

const productRoutes = express.Router();

// ------------------- Multer Setup -------------------
const uploadDir = path.join(process.cwd(), "product-images");

// Make sure the folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // saves in /product-images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
// ------------------- Routes -------------------

// Get all products with filtering and pagination
productRoutes.get("/", async (req, res) => {
  try {
    const {
      category,
      search,
      featured,
      page = 1,
      limit = 12,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const query = { isActive: true };
    if (category && category !== "all") query.category = category;
    if (featured === "true") query.featured = true;
    if (search) query.$text = { $search: search };

    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit);
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number.parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      pagination: {
        currentPage: Number.parseInt(page),
        totalPages: Math.ceil(total / Number.parseInt(limit)),
        totalProducts: total,
        hasNext: skip + products.length < total,
        hasPrev: Number.parseInt(page) > 1,
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Admin: Get all products (including inactive) - Admin only
productRoutes.get(
  "/admin",
  auth,
  roleCheck("school_admin", "room_supervisor", "store_admin", "principal"),
  async (req, res) => {
    try {
      console.log('Admin GET /products/admin called by user:', req.user && req.user._id ? { id: req.user._id, role: req.user.role } : 'unknown');
      console.log('Query params:', req.query);
      const {
        category,
        search,
        featured,
        page = 1,
        limit = 12,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = req.query;

      // Admin can see all products (no isActive filter)
      const query = {};
      if (category && category !== "all") query.category = category;
      if (featured === "true") query.featured = true;
      if (search) query.$text = { $search: search };

      const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit);
      const sort = {};
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;

      const products = await Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(Number.parseInt(limit));

      const total = await Product.countDocuments(query);

      res.json({
        products,
        pagination: {
          currentPage: Number.parseInt(page),
          totalPages: Math.ceil(total / Number.parseInt(limit)),
          totalProducts: total,
          hasNext: skip + products.length < total,
          hasPrev: Number.parseInt(page) > 1,
        },
      });
    } catch (error) {
      console.error("Get admin products error:", error, error.stack);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
);

// Get single product by ID
productRoutes.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, isActive: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Admin: Get single product by ID (can return inactive) - Admin only
productRoutes.get(
  "/admin/:id",
  auth,
  roleCheck("school_admin", "room_supervisor", "store_admin", "principal"),
  async (req, res) => {
    try {
      console.log('Admin GET /products/admin/:id called by user:', req.user && req.user._id ? { id: req.user._id, role: req.user.role } : 'unknown', 'params:', req.params);
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (error) {
      console.error("Get admin product error:", error, error.stack);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
);

// Get product categories
productRoutes.get("/meta/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category", { isActive: true });
    res.json(categories);
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
productRoutes.post(
  "/",
  auth,
  roleCheck("school_admin", "room_supervisor", "store_admin", "principal"),
  upload.array("images", 5),
  async (req, res) => {
    try {
      const { name, description, category, price, stock, featured, sizes } = req.body;

      if (!name || !category || !price || !stock) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      let parsedSizes = [];
      if (sizes) {
        parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes);
      }

      // ✅ Full URL images
      const images = req.files
        ? req.files.map((file) => `product-images/${file.filename}`)
        : [];


      const product = new Product({
        name,
        description: description || "",
        category,
        price: parseFloat(price),
        stock: parseInt(stock),
        featured: featured === "true",
        sizes: parsedSizes,
        images,
      });

      await product.save();
      res.status(201).json({ message: "Product created successfully", product });
    } catch (err) {
      console.error("Create product error:", err);

      if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ message: "Validation error", errors });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  }
);



// Update product (Admin only) with optional image upload
productRoutes.put(
  "/:id",
  auth,
  roleCheck("school_admin", "room_supervisor", "store_admin", "principal"),
  upload.array("images", 5),
  async (req, res) => {
    try {
      const { name, description, category, price, stock, sizes, featured, isActive } = req.body;
      console.log('Admin PUT /products/:id body:', req.body);
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      if (name !== undefined) product.name = name;
      if (description !== undefined) product.description = description;
      if (category !== undefined) product.category = category;
      if (price !== undefined) product.price = parseFloat(price);
      if (stock !== undefined) product.stock = parseInt(stock);
      if (sizes !== undefined) {
        product.sizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes);
      }
      if (featured !== undefined) product.featured = featured === "true";
      if (isActive !== undefined) {
        // Accept both boolean and string representations for isActive
        if (typeof isActive === "boolean") {
          product.isActive = isActive;
        } else {
          product.isActive = String(isActive) === "true";
        }
      }

      console.log('Product isActive after assign (before save):', product.isActive);

      // ✅ Handle images
      if (req.files && req.files.length > 0) {
        const newImages = req.files.map((file) => `product-images/${file.filename}`);
        // Option 1: Replace all
        // product.images = newImages;

        // Option 2: Append new images to existing ones
        product.images = [...product.images, ...newImages];
      }

      await product.save();

      // ✅ Return product with images so frontend can refresh immediately
      console.log('Product saved:', product._id, 'isActive:', product.isActive);
      res.json({ message: "Product updated successfully", product });
    } catch (error) {
      console.error("Update product error:", error);
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ message: "Validation error", errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Delete product (Admin only)
productRoutes.delete(
  "/:id",
  auth,
  roleCheck("school_admin", "room_supervisor", "store_admin", "principal"),
  async (req, res) => {
    try {
      console.log('Admin DELETE /products/:id called by user:', req.user && req.user._id ? { id: req.user._id, role: req.user.role } : 'unknown', 'params:', req.params);
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      // Capture image paths for background deletion
      const imagesToDelete = Array.isArray(product.images) ? [...product.images] : [];

      // Permanently remove the product document from the database first
      await Product.deleteOne({ _id: product._id });

      // Attempt to delete image files in background; don't let file errors block response
      (async () => {
        if (imagesToDelete.length > 0) {
          await Promise.allSettled(
            imagesToDelete.map(async (img) => {
              try {
                // Only attempt to unlink relative product-images paths
                const imgPath = path.join(process.cwd(), img);
                if (fs.existsSync(imgPath)) {
                  await fs.promises.unlink(imgPath);
                  console.log('Deleted product image file:', imgPath);
                } else {
                  // log if file not found
                  console.warn('Product image file not found (skip):', imgPath);
                }
              } catch (fsErr) {
                console.warn('Failed to delete product image file:', img, fsErr.message);
              }
            })
          );
        }
      })();

      // Respond immediately that deletion succeeded
      res.json({ message: "Product permanently deleted" });
    } catch (error) {
      console.error("Delete product error:", error, error.stack);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
);

// Update product stock (Admin only)
productRoutes.patch(
  "/:id/stock",
  auth,
  roleCheck("school_admin", "room_supervisor", "store_admin", "principal"),
  async (req, res) => {
    try {
      const { stock } = req.body;
      if (stock < 0) return res.status(400).json({ message: "Stock cannot be negative" });

      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      product.stock = stock;
      await product.save();

      res.json({ message: "Stock updated successfully", product });
    } catch (error) {
      console.error("Update stock error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default productRoutes;
