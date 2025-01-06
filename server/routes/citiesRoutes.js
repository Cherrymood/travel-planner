import express from "express";
import { getCities, getCity } from "../controllers/getCities.js";

const citiesRouter = express.Router();

citiesRouter.get("/", getCities);
citiesRouter.get("/:id", getCity);

export default citiesRouter;
