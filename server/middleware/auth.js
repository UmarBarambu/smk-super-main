import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.warn('🔒 No token provided');
    return res.status(401).json({ error: 'Unauthorized - Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🔓 Token decoded:', decoded);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      console.warn('❌ User not found for decoded token');
      return res.status(401).json({ error: 'Unauthorized - User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('❌ Invalid token:', err.message);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

// Pass one or more roles allowed to access the route
const roleCheck = (...roles) => (req, res, next) => {
  if (!req.user?.role || typeof req.user.role !== 'string') {
    console.warn('❌ Access denied - No user or invalid role in request');
    return res.status(403).json({ error: 'Forbidden - No user or role' });
  }

  const normalizedUserRole = req.user.role.toLowerCase();
  const normalizedRoles = roles
    .filter(role => typeof role === 'string') // Ensure the role is a string
    .map(role => role.toLowerCase());

  if (!normalizedRoles.includes(normalizedUserRole)) {
    console.warn(`❌ Access denied - '${req.user.role}' not in [${roles.join(', ')}]`);
    return res.status(403).json({
      error: `Forbidden - Requires role(s): ${roles.join(', ')}`,
    });
  }

  next();
};

export { auth, roleCheck };


// Example usage:

// import express from 'express';
// import { auth, roleCheck } from './middleware/auth.js';

// const router = express.Router();

// router.get('/admin/dashboard', auth, roleCheck('school_admin', 'principal'), (req, res) => {
//   res.json({ message: `Welcome, ${req.user.role}!` });
// });

// router.get('/store', auth, roleCheck('cooperation_store_admin'), (req, res) => {
//   res.json({ message: 'Welcome to the store dashboard' });
// });
