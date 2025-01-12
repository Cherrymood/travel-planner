import { clientMongo } from "../db/connectDB.js";
import readUserDB from "../db/readUserDB.js";
import { compareHashedPassword } from "./hashing.js";

export default async function handleLogin(req, res) {
  try {
    const login = req.body.email;
    const password = req.body.password;

    await clientMongo.connect();

    const { result } = await readUserDB(clientMongo, login);

    if (!result) {
      return res.status(404).send("User not found");
    }

    if (compareHashedPassword(password, result.password)) {
      return res.status(200).send(`Welcome, ${login}!`);
    }

    return res.status(401).send("Invalid password");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal server error");
  } finally {
    await clientMongo.close();
  }
}
