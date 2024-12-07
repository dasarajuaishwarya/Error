const express = require('express');
const { signup, login, updateProfile } = require('../controllers/authController'); // Import signup, login, and updateProfile controllers
const { protect } = require('../middleware/auth'); // Protect middleware for JWT authentication
const router = express.Router();

// Signup Route (POST /api/auth/signup)
router.post('/signup', signup); // Handles user signup

// Login Route (POST /api/auth/login)
router.post('/login', login); // Handles user login

// Profile Update Route (PUT /api/auth/profile)
router.put('/profile', protect, updateProfile); // Protect middleware ensures that only authenticated users can update profile

module.exports = router;
