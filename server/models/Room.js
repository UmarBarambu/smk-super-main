import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Ensure the room has a name
    capacity: { type: Number, required: true, min: 1 }, // Ensure capacity is a positive number
    type: { type: String, enum: ['library', 'meeting', 'special'], required: true }, // Restrict to specific types
  },
  { timestamps: true }
);

export default mongoose.model('Room', RoomSchema);