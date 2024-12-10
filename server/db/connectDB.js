// server/db/connect.js
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const clientMongo = new MongoClient(process.env.URL_MD, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectMongo() {
  try {
    // Connect the client to the server
    await clientMongo.connect();
    // Send a ping to confirm a successful connection
    await clientMongo.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

async function closeMongo() {
  try {
    await clientMongo.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Failed to close MongoDB connection:", error);
  }
}

export { clientMongo, connectMongo, closeMongo };
