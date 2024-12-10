import { clientMongo } from "../db/connectDB.js";
import readUserDB from "../db/readUserDB.js";

export default async function handleLogin(req, res) {
  try {
    const login = req.body.email;
    const password = req.body.password;

    await clientMongo.connect();

    const user = await readUserDB(clientMongo, login);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.password !== password) {
      return res.status(401).send("Invalid password");
    }

    console.log(`Login successful for user: ${login}`);
    res.status(200).send(`Welcome, ${login}!`);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal server error");
  } finally {
    // Close the client connection
    await clientMongo.close();
  }
}
