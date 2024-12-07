// const mongoose = require('mongoose');

// const db = async () => {
//     try {
//         mongoose.set('strictQuery', false)
//         await mongoose.connect(process.env.MONGO_URL)
//         console.log('Db Connected')
//     } catch (error) {
//         console.log('DB Connection Error');
//     }
// }

// module.exports = {db}

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
