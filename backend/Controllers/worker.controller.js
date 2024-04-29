const Worker = require('../Models/Worker.model');

module.exports = {
  createWorker: async (req, res) => {
    try {
      const newWorker = new Worker(req.body);
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
  }
};
