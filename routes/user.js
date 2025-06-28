import express from 'express';
import User from '../models/User.js'; // adjust path if needed
import { verifyToken } from '../middleware/authMiddleware.js'; // if you're using auth

const router = express.Router();

// 🧠 Protected: Only for logged-in users
router.get('/all', verifyToken, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // hide passwords
    res.status(200).json({
      message: 'All users fetched successfully',
      users,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
