import express from "express";
import authentication from "../controllers/authentication.js";

const router = express.Router();

router.post("/", authentication);

export default router;
