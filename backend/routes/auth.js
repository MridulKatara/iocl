const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const dummyUsers = [
    { username: 'admin@example.com', password: 'admin123', role: 'admin' },
    { username: 'worker@example.com', password: 'worker123', role: 'worker' },
  ];
  
// POST /api/login - Authenticate user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      // User not found or incorrect password
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Authentication successful, generate token
    const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token and user role in response
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
