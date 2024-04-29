const Worker = require('../Models/Worker.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  createWorker: async (req, res) => {
    try {
      const { fullName, email, mobile, position, role, residentialAddress, gender, password, confirmPassword } = req.body;
    
          if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password and confirm password do not match' });
          }
    
          const hashedPassword = await bcrypt.hash(password, 10);
    
          const newWorker = new Worker({
            fullName,
            email,
            mobile,
            position,
            role,
            residentialAddress,
            gender,
            password: hashedPassword
          });
      await newWorker.save();
      res.status(201).json({ message: 'Worker data created successfully', worker: newWorker });
    } catch (error) {
      console.error('Error creating worker:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getWorkers: async (req, res) => {
    try {
      const workers = await Worker.find();
      res.status(200).json(workers);
    } catch (error) {
      console.error('Error fetching workers:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find worker by email
      const worker = await Worker.findOne({ email });

      if (!worker) {
        return res.status(401).json({ message: 'Invalid email' });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, worker.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Generate JWT token for workers
      const token = jwt.sign({ workerId: worker._id }, 'your_secret_key', { expiresIn: '1h' });
      return res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
      console.error('Error logging in worker:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
