const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  const bcrypt = require('bcrypt');
//   const User = require('../models/User');
  
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log("Entered Plain Text Password:", password);
      console.log("Stored Hashed Password:", user.password);
  
      // Compare entered password with the hashed password stored in DB
      const isMatch = await bcrypt.compare(password, user.password);
  
      console.log("Password match result:", isMatch);  // Log the result of bcrypt comparison
  
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT token after successful login
      const token = jwt.sign(
        { id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ token, name: user.name });
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  




// controllers/authController.js
// exports.updateProfile = async (req, res) => {
//     console.log("Update Profile - req.user:", req.user); // Debug log to ensure req.user is set
  
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "Not authorized" });
//     }
  
//     const { name, password } = req.body;
  
//     try {
//       const user = await User.findById(req.user.id); // Find the user by ID from JWT
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       // Update name and password if provided
//       if (name) user.name = name;
//       if (password) {
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);
//       }
  
//       await user.save(); // Save updated user details
  
//       res.status(200).json({ message: "Profile updated successfully" });
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       res.status(500).json({ message: "Error updating profile" }); // Return a server error if something goes wrong
//     }
//   };



// const bcrypt = require('bcrypt');
// const User = require('../models/User'); // Ensure correct path to your User model
exports.updateProfile = async (req, res) => {
    const { name, password } = req.body;
  
    try {
      // Ensure the user is authenticated
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user details
      if (name) user.name = name;
      if (password) user.password = password; // Ensure password is hashed
  
      await user.save();
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
