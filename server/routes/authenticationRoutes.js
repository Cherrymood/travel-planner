import express from "express";
import handleLogin from "../controllers/authenticationController.js";

const router = express.Router();

export default router.post("/", handleLogin);
