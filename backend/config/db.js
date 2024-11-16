import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

// Connect to Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    
    });
    console.log(chalk.green.bold("Connected to MongoDB"));
  } catch (error) {
    console.error(chalk.red.bold("Connection to MongoDB failed:"), error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
