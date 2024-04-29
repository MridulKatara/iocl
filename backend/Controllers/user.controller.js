const User = require('../Models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: async (req, res) => {
        try {
          const { fullName, email, mobile, position, role, residentialAddress, gender, password, confirmPassword } = req.body;
    
          if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password and confirm password do not match' });
          }
    
          const hashedPassword = await bcrypt.hash(password, 10);
    
          const newUser = new User({
            fullName,
            email,
            mobile,
            position,
            role,
            residentialAddress,
            gender,
            password: hashedPassword
          });
    
          await newUser.save();
          res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
          console.error('Error creating user:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      },

      login: async (req, res) => {
        try {
          const { email, password } = req.body;
    
          // Find user by email
          const user = await User.findOne({ email });
    
          if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
    
          // Check password
          const isPasswordValid = await bcrypt.compare(password, user.password);
    
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
    
          // Generate JWT token for admin users
          if (user.role === 'admin') {
            const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
            return res.status(200).json({ message: 'Login successful', token });
          }
    
          res.status(403).json({ message: 'Forbidden' }); // Only admin users can login
        } catch (error) {
          console.error('Error logging in:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      },

  getWorkers: async (req, res) => {
    try {
      const workers = await User.find({ role: 'worker' });
      res.status(200).json(workers);
    } catch (error) {
      console.error('Error fetching workers:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
