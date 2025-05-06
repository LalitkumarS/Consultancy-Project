const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the connectDB function
const orderRoutes = require('./routes/orderRoutes'); // Import your order routes

const app = express();

// Middleware to handle JSON body parsing
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from localhost:3000 (frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Use the order routes
app.use('/api', orderRoutes);

// Connect to MongoDB
connectDB();

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
