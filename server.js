import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import citiesRouter from "./server/routes/citiesRoutes.js";
import loginRoutes from "./server/routes/authenticationRoutes.js";
import signupRoutes from "./server/routes/signupRoutes.js";

const app = express();
const port = 3000;

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

// ROUTES
app.use("/cities", citiesRouter);
app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
