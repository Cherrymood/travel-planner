import express from "express";
import {
  getCities,
  getCity,
  createCity,
  deleteCity,
} from "../controllers/getCities.js";

const citiesRouter = express.Router();

citiesRouter.get("/", getCities).post("/", createCity);
citiesRouter.get("/:id", getCity).delete("/:id", deleteCity);

export default citiesRouter;
