import express from "express";
import getCities from "../controllers/getCities.js";

const citiesRouter = express.Router();

citiesRouter.get("/", getCities);

export default citiesRouter;
