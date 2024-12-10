import express from "express";
import handleLogin from "../controllers/loginController.js";

const router = express.Router();

export default router.post("/", handleLogin);
