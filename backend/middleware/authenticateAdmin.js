// middleware/authenticateAdmin.js
const jwt = require('jsonwebtoken');
const User = require('../Models/User.model');

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = jwt.verify(token, 'your_secret_key');
    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error authenticating admin:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = authenticateAdmin;
