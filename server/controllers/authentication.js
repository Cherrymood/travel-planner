import User from "../db/UserSchema.js"; // Import the Mongoose model
import { compareHashedPassword } from "./hashing.js";

export default async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    console.log({ email, password });

    // Validate input
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    // Find the user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("Invalid email or password");
    }

    // Compare the hashed password
    const isPasswordValid = await compareHashedPassword(
      password,
      user.password
    );

    if (isPasswordValid) {
      return res.status(200).send(`Welcome, ${user.username || email}!`);
    }

    return res.status(401).send("Invalid password");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal server error");
  }
}
