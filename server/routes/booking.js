import express from 'express';
import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import { auth, roleCheck } from '../middleware/auth.js';

const bookingRoutes = express.Router();

// Create a booking — only for students and teachers
bookingRoutes.post(
  '/',
  auth,
  roleCheck('student', 'class_teacher', 'regular_teacher'),
  async (req, res) => {
    try {
      const { roomId, date, timeSlot, attendees, isSpecial, pic, title } = req.body;

      const room = await Room.findById(roomId);
      if (!room) return res.status(404).json({ error: 'Room not found' });

      if (attendees > room.capacity) {
        return res.status(400).json({ error: 'Exceeds room capacity' });
      }

      const conflictingBooking = await Booking.findOne({ roomId, date, timeSlot });
      if (conflictingBooking) {
        return res.status(400).json({ error: 'Time slot already booked for this room' });
      }

      const booking = new Booking({
        userId: req.user._id,
        roomId,
        date,
        timeSlot,
        attendees,
        isSpecial: isSpecial || false,
        status: 'pending',
        pic,
        title,
      });

      await booking.save();
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Admins and supervisors can view all bookings
bookingRoutes.get(
  '/',
  auth,
  roleCheck('school_admin', 'room_supervisor', 'principal'),
  async (req, res) => {
    try {
      const bookings = await Booking.find().populate('userId roomId');
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Approve a booking — only by school_admin, room_supervisor, or principal
bookingRoutes.patch(
  '/:id/approve',
  auth,
  roleCheck('school_admin', 'room_supervisor', 'principal'),
  async (req, res) => {
    try {
      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status: 'approved' },
        { new: true }
      );
      if (!booking) return res.status(404).json({ error: 'Booking not found' });
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Reject a booking — only by school_admin, room_supervisor, or principal
bookingRoutes.patch(
  '/:id/reject',
  auth,
  roleCheck('school_admin', 'room_supervisor', 'principal'),
  async (req, res) => {
    try {
      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status: 'rejected' },
        { new: true }
      );
      if (!booking) return res.status(404).json({ error: 'Booking not found' });
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// View personal bookings — any authenticated user
bookingRoutes.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate('roomId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a booking — only by school_admin, room_supervisor, or principal
bookingRoutes.delete(
  '/:id',
  auth,
  roleCheck('school_admin', 'room_supervisor', 'principal'),
  async (req, res) => {
    try {
      const booking = await Booking.findByIdAndDelete(req.params.id);
      if (!booking) return res.status(404).json({ error: 'Booking not found' });
      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default bookingRoutes;
