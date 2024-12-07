// const User = require("../models/User");
// const bcrypt = require("bcrypt");

// // controllers/authController.js
// exports.updateProfile = async (req, res) => {
//   console.log("Update Profile - req.user:", req.user); // Debug log

//   if (!req.user || !req.user.id) {
//     return res.status(401).json({ message: "Not authorized" });
//   }

//   const { name, password } = req.body;

//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (name) user.name = name;
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);
//     }

//     await user.save();
//     res.status(200).json({ message: "Profile updated successfully" });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
