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
        const { roomId, date, timeSlot, startTime, endTime, attendees, isSpecial, pic, title } = req.body;

      const room = await Room.findById(roomId);
      if (!room) return res.status(404).json({ error: 'Room not found' });

      if (attendees > room.capacity) {
        return res.status(400).json({ error: 'Exceeds room capacity' });
      }
      if (!startTime || !endTime) {
        return res.status(400).json({ error: 'Start time and end time are required' });
      }

      // convert times to minutes for comparison
      const toMinutes = (t) => {
        const parts = t.split(":").map(Number);
        return parts[0] * 60 + (parts[1] || 0);
      };
      const reqStart = toMinutes(startTime);
      const reqEnd = toMinutes(endTime);
      if (reqEnd <= reqStart) {
        return res.status(400).json({ error: 'End time must be after start time' });
      }

      // check for overlapping bookings on same date and room
      // ignore bookings that were rejected — they should not block availability
      const existing = await Booking.find({ roomId, date, status: { $ne: 'rejected' } });
      const overlap = existing.some((b) => {
        // if existing booking stored with startTime/endTime use them, else parse timeSlot if present
        const bStart = b.startTime ? toMinutes(b.startTime) : null;
        const bEnd = b.endTime ? toMinutes(b.endTime) : null;
        if (bStart != null && bEnd != null) {
          // overlap if intervals intersect
          return !(reqEnd <= bStart || reqStart >= bEnd);
        }
        // fallback: if legacy timeSlot exists, try parsing format "From HH:MM To HH:MM"
        if (b.timeSlot && typeof b.timeSlot === 'string') {
          const m = b.timeSlot.match(/From\s*(\d{2}:\d{2})\s*To\s*(\d{2}:\d{2})/i);
          if (m) {
            const bs = toMinutes(m[1]);
            const be = toMinutes(m[2]);
            return !(reqEnd <= bs || reqStart >= be);
          }
        }
        return false;
      });

      if (overlap) {
        return res.status(400).json({ error: 'Requested time overlaps an existing booking for this room' });
      }

      const booking = new Booking({
        userId: req.user._id,
        roomId,
        date,
        timeSlot: timeSlot || undefined,
        startTime,
        endTime,
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

// Get bookings for a specific room in a date range (authenticated users)
bookingRoutes.get('/room/:roomId', auth, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { from, to } = req.query; // ISO dates (yyyy-mm-dd)

    const query = { roomId };
    if (from || to) {
      // build Date range for the whole days
      query.date = {};
      if (from) {
        const fromDate = new Date(from);
        fromDate.setHours(0, 0, 0, 0);
        query.date.$gte = fromDate;
      }
      if (to) {
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        query.date.$lte = toDate;
      }
    }

    const bookings = await Booking.find(query).populate('userId roomId');
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
