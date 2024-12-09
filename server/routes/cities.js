import express from "express";
import getCities from "../controllers/cities.js";

const citiesRouter = express.Router();

citiesRouter.get("/cities", getCities);

export default citiesRouter;
