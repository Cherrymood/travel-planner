import express from "express";
import { register, login } from "../controllers/authentication.js";
import passport from "../controllers/passportConfig.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      const user = await User.checkExistUser(req.body);
      const token = user.createJWT();

      // Send token to client
      res
        .status(StatusCodes.OK)
        .json({ user: { name: req.user.username }, token });
    } catch (error) {
      console.error("Error during token generation:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }
);
export default router;
