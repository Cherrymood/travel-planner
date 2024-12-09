import express from "express";
import env from "dotenv";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import citiesRouter from "./server/routes/cities.js";

const app = express();
const port = 3000;

env.config();
console.log(process.env.URL_MD);

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("cities", citiesRouter);

app.post("/login", async (req, res) => {
  console.log(req.body);
  res.send("Login request received!");
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
