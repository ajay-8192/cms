const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('MONGO_URL', {
      dbName: 'cms-tool'
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
