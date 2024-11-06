import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    console.log("Attempting to connect to database.....");
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database.....");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
