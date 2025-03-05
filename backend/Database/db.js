const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`MongoDB connected with server: ${connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
