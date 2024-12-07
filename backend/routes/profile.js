// routes/profile.js
// const express = require("express");
// const { updateProfile } = require("../controllers/authController");
// const { protect } = require("../middleware/auth");

// const router = express.Router();

// // Debug req.user in route
// router.put("/", protect, (req, res, next) => {
//   console.log("Route handler - req.user:", req.user); // Debug log
//   next();
// }, updateProfile);

// module.exports = router;



const express = require("express");
const { updateProfile } = require("../controllers/authController");  // Import from authController
const { protect } = require("../middleware/auth");

const router = express.Router();

// Route to update user profile (name, password) - protected route
router.put("/profile", protect, updateProfile);  // Use updateProfile from authController

module.exports = router;