import express from "express";
import {
  getCities,
  getCity,
  createCity,
  deleteCity,
} from "../controllers/getCities.js";


const citiesRouter = express.Router();

citiesRouter.get("/", getCities);
citiesRouter.post("/", createCity);
citiesRouter.get("/:id", getCity);
citiesRouter.delete("/:id", deleteCity);

export default citiesRouter;
