import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export default async function authentication(req, res) {
  try {
    const { email, password } = req.body;

    console.log("Req.body", req.body);

    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Email and password are required" });
    }

    let user = await User.checkExistUser(req.body);

    if (!user && !req.body.username) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Unauthorized: User is not authenticated.",
      });
    }

    if (!user && req.body.username) {
      const { email, password, username } = req.body;

      user = await User.create({ email, password, username });

      return res
        .status(StatusCodes.CREATED)
        .json({ user: { name: user.username }, token: user.createJWT() });
    }

    res
      .status(StatusCodes.OK)
      .json({ user: { name: user.username }, token: user.createJWT() });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}
