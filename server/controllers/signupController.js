import { clientMongo } from "../db/connectDB.js";
import createUserDB from "../db/createUserDB.js";
import readUserDB from "../db/readUserDB.js";

export default async function handleSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    // Connect to MongoDB if not already connected
    if (!clientMongo.topology || !clientMongo.topology.isConnected()) {
      await clientMongo.connect();
    }

    // Check if the user already exists
    const userExists = await readUserDB(clientMongo, email);
    console.log(userExists);

    if (userExists) {
      return res.status(409).send("User already exists");
    }

    // Create a new user
    const newUser = await createUserDB(clientMongo, { name, email, password });

    return res.status(201).send(`User created successfully: ${name}`);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Internal server error");
  } finally {
    // Close the client connection if it's connected
    if (clientMongo.topology && clientMongo.topology.isConnected()) {
      await clientMongo.close();
    }
  }
}
