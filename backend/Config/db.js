const mongoose = require('mongoose');
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    // Connect to MongoDB using the provided URL
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Exit process if MongoDB connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
