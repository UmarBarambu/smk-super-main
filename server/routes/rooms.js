import express from 'express';
import Room from '../models/Room.js';
import { auth, roleCheck } from '../middleware/auth.js';

const roomRoutes = express.Router();

// Create a new room (Admin only)
roomRoutes.post('/', auth, roleCheck('admin', 'principal', 'school_admin'), async (req, res) =>  {
  try {
    const { name, capacity, type } = req.body;

    // Validate required fields
    if (!name || !capacity || !type) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new room
    const room = new Room({ name, capacity, type });
    await room.save();

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all rooms
roomRoutes.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single room by ID
roomRoutes.get('/:id', auth, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a room (Admin only)
roomRoutes.put('/:id', auth, roleCheck('admin', 'principal', 'school_admin'), async (req, res) => {
  try {
    const { name, capacity, type } = req.body;

    // Find and update the room
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { name, capacity, type },
      { new: true, runValidators: true }
    );

    if (!room) return res.status(404).json({ error: 'Room not found' });

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a room (Admin only)
roomRoutes.delete('/:id', auth, roleCheck('admin', 'principal', 'school_admin'), async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default roomRoutes;