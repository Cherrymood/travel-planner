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
import MongoStore from "connect-mongo";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

import citiesRouter from "./routes/citiesRoutes.js";
import authUser from "./middleware/authentication.js";
import authRoute from "./routes/authenticationRoutes.js";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

import connectDB from "./db/connectDB.js";

env.config();

const app = express();
const port = 3000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for my full-stack application',
    },
    servers: [

      {
        url: process.env.BASE_URL,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJSDoc(swaggerOptions);
// Middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.set("trust proxy", 1);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(helmet()); //Sets Security Headers,Protects Against Certain Attacks
app.use(
  cors({
    origin: "http://localhost:5173",
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
app.use('/api', authRoute);
app.use('/api', citiesRouter);

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
