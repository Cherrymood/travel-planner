import express from "express";
import { getCities, getCity, createCity } from "../controllers/getCities.js";

const citiesRouter = express.Router();

citiesRouter.get("/", getCities);
citiesRouter.post("/", createCity);

citiesRouter.get("/:id", getCity);

export default citiesRouter;
