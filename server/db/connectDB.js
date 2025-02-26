import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url, {
    serverSelectionTimeoutMS: 50000,
  });
};

export default connectDB;
