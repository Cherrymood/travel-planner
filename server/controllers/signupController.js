import { clientMongo } from "../db/connectDB.js";
import createUserDB from "../db/createUserDB.js";
import readUserDB from "../db/readUserDB.js";
import hashBCRypt from "./hashingController.js";

export default async function handleSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    // Connect to MongoDB if not already connected
    if (!clientMongo.topology || !clientMongo.topology.isConnected()) {
      await clientMongo.connect();
    }

    // Check if the user already exists
    const { userExists } = await readUserDB(clientMongo, email);
    console.log(userExists);

    if (userExists) {
      return res.status(409).send("User already exists");
    }

    // Hash the password before storing it
    const hashedPassword = await hashBCRypt(password);
    console.log(hashedPassword);

    // Create a new user
    await createUserDB(clientMongo, {
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).send(`User created successfully: ${name}`);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Internal server error");
  } finally {
    if (clientMongo.topology && clientMongo.topology.isConnected()) {
      await clientMongo.close();
    }
  }
}
