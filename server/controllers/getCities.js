import City from "../models/City.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const getCities = async (req, res) => {
  const userId = req.user.userId;

  const cities = await City.find({ createdBy: userId });

  if (!cities) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "City not found" });
  }

  res.status(StatusCodes.OK).json({ cities });
};

const getCity = async (req, res, next) => {
  const { id: cityId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cityId)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid city ID" });
  }

  const city = await City.findById(cityId);

  if (!city) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "City not found" });
  }

  res.status(StatusCodes.OK).json({ city });
};

const createCity = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const city = await City.create(req.body);

  res.status(StatusCodes.CREATED).json({ city });
};

const updateCity = async (req, res) => {
  console.log("updateJob");
};

const deleteCity = async (req, res) => {
  const { id: cityId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cityId)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid city ID" });
  }

  const city = await City.findById(cityId);

  if (!city) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "City not found" });
  }

  await city.deleteOne();

  res.status(StatusCodes.OK).json({ city });
};

export { getCities, getCity, createCity, deleteCity, updateCity };
