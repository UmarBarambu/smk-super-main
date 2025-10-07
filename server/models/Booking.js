import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }, // Reference to Room model
    date: { type: Date, required: true }, // Ensure a booking date is provided
    timeSlot: { type: String, required: true }, // Ensure a time slot is provided
    attendees: { type: Number, required: true, min: 1 }, // Ensure attendees is a positive number
    isSpecial: { type: Boolean, default: false }, // Default to false if not specified
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' // Default status is 'pending'
    },
    pic: { type: String, required: true }, // Person in charge
    title: { type: String, required: true }, // Booking title
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model('Booking', BookingSchema);