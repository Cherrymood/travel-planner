import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

export default async function auth(req, res, next) {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Authentication required");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
}
