const mongoose = require("mongoose");

const connectDB = async (mongoURL) => {
  try {
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = {connectDB};
