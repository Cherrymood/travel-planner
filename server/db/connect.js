import { MongoClient, ServerApiVersion } from "mongodb";

// Function to create a MongoDB client with a dynamic URL
export default async function createMongoBDClient(url) {
  const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  return client;
}
