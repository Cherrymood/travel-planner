import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import env from "dotenv";
import xss from "xss-clean";
import { rateLimit } from "express-rate-limit";
import session from "express-session";
import passport from "./server/controllers/passportConfig.js";

import citiesRouter from "./server/routes/citiesRoutes.js";
import authUser from "./server/middleware/authentication.js";
import authRoutes from "./server/routes/authenticationRoutes.js";

import notFoundMiddleware from "./server/middleware/not-found.js";
import errorHandlerMiddleware from "./server/middleware/error-handler.js";

import connectDB from "./server/db/connectDB.js";

env.config();

const app = express();
const port = 3000;

// Middleware
app.set("trust proxy", 1);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(helmet()); //Sets Security Headers,Protects Against Certain Attacks
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
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
app.get("/auth/google/proxy", (req, res) => {
  const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const redirectUrl = `${googleAuthUrl}?response_type=code&redirect_uri=${encodeURIComponent(
    "http://localhost:3000/auth/google/callback"
  )}&scope=email%20profile&client_id=${process.env.GOOGLE_CLIENT_ID}`;

  req(redirectUrl, (error, response, body) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.send(body);
  });
});

app.use(passport.initialize()); // init passport on every route call
app.use(passport.session()); //allow passport to use "express-session"

// ROUTES
app.use("/auth", authRoutes);
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
