require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboard');
const transactionRoutes = require('./routes/transactions');
const profileRoutes = require("./routes/profile");
const { protect } = require('./middleware/auth');

// MongoDB Connection
mongoose.set('strictQuery', false);
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
(async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
})();

// Routes
app.use('/api/auth', authRoutes);  // Auth routes for login/signup
app.use("/api/auth/profile", protect, profileRoutes);  // Profile routes
app.use('/api/v1/dashboard', protect, dashboardRoutes);  // Dashboard routes
app.use('/api/v1', protect, transactionRoutes);  // Transaction routes

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global Error:', err.message);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
