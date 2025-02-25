import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import env from "dotenv";
import xss from "xss-clean";
import { rateLimit } from "express-rate-limit";
import session from "express-session";
import flash from "connect-flash";

import citiesRouter from "./server/routes/citiesRoutes.js";
import authUser from "./server/middleware/authentication.js";
import authRoute from "./server/routes/authenticationRoutes.js";

import notFoundMiddleware from "./server/middleware/not-found.js";
import errorHandlerMiddleware from "./server/middleware/error-handler.js";

import connectDB from "./server/db/connectDB.js";

env.config();

const app = express();
const port = 3000;

// Middleware
app.set("trust proxy", 1);
app.use(flash());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(helmet()); //Sets Security Headers,Protects Against Certain Attacks
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://travel-planner.horodnycha.com:5173",
      ];
      if (
        !origin ||
        allowedOrigins.indexOf(origin) !== -1 ||
        origin.endsWith(".horodnycha.com")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(xss());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.info = req.flash("info");
  res.locals.errors = req.flash("error");
  res.locals.csrfToken = req.csrfToken();
  next();
});

// ROUTES
app.use("/auth", authRoute);
app.use("/app/cities", authUser, citiesRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database connected successfully");

    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    // Graceful shutdown handling
    process.on("SIGINT", async () => {
      try {
        console.log("Closing server...");
        await server.close();
        console.log("Server closed");
        process.exit(0);
      } catch (error) {
        console.error("Error shutting down the server:", error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

startServer();
