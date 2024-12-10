import express from "express";
import handleSignUp from "../controllers/signupController.js";

const router = express.Router();

export default router.post("/", handleSignUp);
