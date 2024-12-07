const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: { // Added name field
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

// Hash the password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip hashing if the password wasn't modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next();
});


// Method to compare plain-text password with hashed password
UserSchema.methods.comparePassword = async function (password) {
  console.log("Entered Password for comparison:", password);  // Log the entered password
  console.log("Stored Hash:", this.password);  // Log the stored hash

  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
