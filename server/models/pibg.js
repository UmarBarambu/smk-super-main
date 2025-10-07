import mongoose from "mongoose";

const pibgSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  parentName: {
    type: String,
    required: true,
  },
  childName: {
    type: String,
    required: true,
  },
  form: {
    type: String,
    required: true,
    enum: ["1", "2", "3", "4", "5"], // Form 1 to 5
  },
  class: {
    type: String,
    required: true,
    enum: ["ELIT", "MUSYTARI", "UTARID", "URANUS", "ZUHRAH", "ZUHAL"],
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  receipt: {
    type: String, // usually the file path or base64 string
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "verified", "rejected"],
  },
});

const Pibg = mongoose.model("Pibg", pibgSchema);
export default Pibg;
