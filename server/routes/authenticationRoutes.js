import express from "express";
import handleLogin from "../controllers/authentication.js";

const router = express.Router();

export default router.post("/", handleLogin);
