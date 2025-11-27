import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
       enum: ["PPKI", "Uniforms", "Books", "Supplies","Accessories", "Others", "Form 1", "Form 2", "Form 3","Form 4", "Form 5"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },

    // ✅ Update here: allow both URLs and local file paths
    images: [
      {
        type: String,
        validate: {
          validator: (v) => {
            // Accept absolute URLs (http/https) OR local paths like "product-images/file.png"
            return (
              /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v) ||
              /^product-images\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v)
            );
          },
          message: "Please provide a valid image URL or uploaded file path",
        },
      },
    ],

    sizes: [
      {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ✅ Added sku field
    sku: {
      type: String,
      unique: true,
      sparse: true, // prevents error on multiple nulls
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Generate SKU before saving
productSchema.pre("save", function (next) {
  if (!this.sku && this.category) {
    const categoryPrefix = this.category.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-6);
    this.sku = `${categoryPrefix}-${timestamp}`;
  }
  next();
});

// Indexes for search and filters
productSchema.index({ name: "text", description: "text", category: "text" });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ featured: 1, isActive: 1 });
productSchema.index({ stock: 1 });

export default mongoose.model("Product", productSchema);

