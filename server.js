import express from "express";
import logger from "morgan";
import cors from "cors";
import env from "dotenv";
import cookieParser from "cookie-parser";

import citiesRouter from "./server/routes/citiesRoutes.js";
import createMongoBDClient from "./server/db/connect.js";

env.config();
console.log(process.env.URL_MD);

const app = express();
const port = 3000;

createMongoBDClient(process.env.URL_MD)
  .then((client) => {
    console.log("Connected to MongoDB");
    // You can optionally store the client or database reference here for later use.
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

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

app.use("/cities", citiesRouter);

app.post("/login", async (req, res) => {
  console.log(req.body);
  res.send("Login request received!");
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
