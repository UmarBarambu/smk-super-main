import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  size: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
})

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  },
)

// Index for efficient queries
cartSchema.index({ userId: 1 })

// Method to calculate cart total
cartSchema.methods.calculateTotal = async function () {
  await this.populate("items.productId")

  return this.items.reduce((total, item) => {
    if (item.productId && item.productId.isActive) {
      return total + item.productId.price * item.quantity
    }
    return total
  }, 0)
}

// Method to get item count
cartSchema.methods.getItemCount = function () {
  return this.items.reduce((count, item) => count + item.quantity, 0)
}

export default mongoose.model("Cart", cartSchema);
