const jwt = require('jsonwebtoken');
const User = require('../Models/User.model');

const authenticateAdmin = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized - Missing Authorization header' });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    // Verify the JWT token
    const decodedToken = jwt.verify(token, 'your_secret_key');

    // Extract the user ID from the decoded token
    const userId = decodedToken.userId;

    // Find the user in the database based on the user ID
    const user = await User.findById(userId);

    // Check if the user exists and is an admin
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden - User is not an admin' });
    }

    // If the user is an admin, attach the user object to the request for further processing
    req.user = user;

    // Call the next middleware in the chain
    next();
  } catch (error) {
    // Handle errors
    console.error('Error authenticating admin:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = authenticateAdmin;
