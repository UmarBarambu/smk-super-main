import mongoose from 'mongoose';
import Room from '../models/Room.js';

const rooms = [
  { name: 'Room A', capacity: 10, type: 'library' },
  { name: 'Room B', capacity: 15, type: 'meeting' },
  { name: 'Room C', capacity: 20, type: 'special' },
  { name: 'Room D', capacity: 25, type: 'library' },
  { name: 'Room E', capacity: 30, type: 'meeting' },
  { name: 'Room F', capacity: 35, type: 'special' },
  { name: 'Room G', capacity: 40, type: 'library' },
  { name: 'Room H', capacity: 45, type: 'meeting' },
  { name: 'Room I', capacity: 50, type: 'special' },
  { name: 'Room J', capacity: 55, type: 'library' },
  { name: 'Room K', capacity: 60, type: 'meeting' },
  { name: 'Room L', capacity: 65, type: 'special' },
  { name: 'Room M', capacity: 70, type: 'library' },
  { name: 'Room N', capacity: 75, type: 'meeting' },
  { name: 'Room O', capacity: 80, type: 'special' },
  { name: 'Room P', capacity: 85, type: 'library' },
  { name: 'Room Q', capacity: 90, type: 'meeting' },
  { name: 'Room R', capacity: 95, type: 'special' },
  { name: 'Room S', capacity: 100, type: 'library' },
  { name: 'Room T', capacity: 105, type: 'meeting' },
  { name: 'Room U', capacity: 110, type: 'special' },
  { name: 'Room V', capacity: 115, type: 'library' },
  { name: 'Room W', capacity: 120, type: 'meeting' },
  { name: 'Room X', capacity: 125, type: 'special' },
  { name: 'Room Y', capacity: 130, type: 'library' },
  { name: 'Room Z', capacity: 135, type: 'meeting' },
];

const seedRooms = async () => {
  try {
    await Room.deleteMany(); // Clear existing data
    await Room.insertMany(rooms); // Insert dummy data
    console.log('Dummy rooms inserted successfully');
  } catch (err) {
    console.error('Error inserting dummy rooms:', err);
  }
};

export default seedRooms;