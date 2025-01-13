import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectMongo, closeMongo } from "./server/db/connectDB.js";

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

// Database Connection
(async () => {
  try {
    await connectMongo(); // Connect to MongoDB when the server starts
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit if the database connection fails
  }
})();

// ROUTES
app.use("/cities", citiesRouter);
app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);

// Start Server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("\nGracefully shutting down...");
  try {
    await closeMongo(); // Close MongoDB connection on shutdown
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error closing the database connection:", error);
  } finally {
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  }
});
