import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import env from "dotenv";

env.config();

async function register(req, res) {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.username }, token });
}

async function login(req, res) {
  try {
    const user = await User.checkExistUser(req.body);
    const token = user.createJWT();

    res.status(StatusCodes.OK).json({ user: { name: user.username }, token });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
  }
}

export { register, login };
