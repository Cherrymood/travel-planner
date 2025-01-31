import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url, {
    serverSelectionTimeoutMS: 30000,
  });
};

export default connectDB;
