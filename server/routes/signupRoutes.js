import express from "express";
import handleSignUp from "../controllers/signup.js";

const router = express.Router();

export default router.post("/", handleSignUp);
