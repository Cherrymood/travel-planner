import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase server selection timeout to 30 seconds
  socketTimeoutMS: 30000, // Increase socket timeout to 30 seconds
};

let isConnected = false;

async function connectMongo() {
  if (!isConnected) {
    try {
      await mongoose.connect(process.env.URL_MD, mongooseOptions);
      console.log("Successfully connected to MongoDB using Mongoose!");
      isConnected = true;
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      throw error;
    }
  }
}

async function getCollection(collectionName) {
  if (!isConnected) {
    await connectMongo();
  }
  const db = mongoose.connection.db;
  return db.collection(collectionName); // MongoDB native collection interface
}

async function closeMongo() {
  if (isConnected) {
    try {
      await mongoose.disconnect();
      isConnected = false;
      console.log("Mongoose connection closed");
    } catch (error) {
      console.error("Failed to close Mongoose connection:", error);
    }
  }
}

export { connectMongo, getCollection, closeMongo };
