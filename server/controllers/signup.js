import User from "../db/UserSchema.js";
import { getCollection } from "../db/connectDB.js";
import { hashPassword } from "./hashing.js";

export default async function handleSignup(req, res) {
  try {
    const { username, email, password } = req.body;
    console.log({ username, email, password });

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res
      .status(201)
      .json({ message: `User created successfully: ${username}` });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
