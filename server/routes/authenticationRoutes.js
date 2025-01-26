import express from "express";
import { register, login } from "../controllers/authentication.js";
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

export default router;
