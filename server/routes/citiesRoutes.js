import express from "express";
import {
  getCities,
  getCity,
  createCity,
  deleteCity,
} from "../controllers/getCities.js";

const citiesRouter = express.Router();

citiesRouter.route("/").get(getCities).post(createCity);
citiesRouter.route("/:id").get(getCity).delete(deleteCity);

export default citiesRouter;
