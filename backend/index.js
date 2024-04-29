const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db'); // Import the connectDB function
const userRoutes = require('./Routes/user.route');
const workerRoutes = require('./Routes/worker.route');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use('/users', userRoutes);
app.use('/workers', workerRoutes);

// Connect to MongoDB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
});
