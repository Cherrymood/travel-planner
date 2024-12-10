import { clientMongo } from "../db/connectDB.js";
import readUserDB from "../db/readUserDB.js";

export default async function handleLogin(req, res) {
  try {
    const login = req.body.email;
    const password = req.body.password;
    console.log(password);
    console.log(typeof password);

    await clientMongo.connect();

    const { result } = await readUserDB(clientMongo, login);
    console.log({ result });

    if (!result) {
      return res.status(404).send("User not found");
    }

    if (result.password !== password) {
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
