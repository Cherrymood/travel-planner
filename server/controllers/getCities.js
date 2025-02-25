import City from "../models/City.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import handleErrors from "../utils/parseValidationErrors.js";

const getCities = async (req, res) => {
  const userId = req.user.userId;

  const cities = await City.find({ createdBy: userId }).sort("createdAt");

  if (!cities) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Cities not found" });
  }

  res.status(StatusCodes.OK).json({ cities, count: cities.length });
};

const getCity = async (req, res) => {
  const {
    user: { userId },
    params: { id },
  } = req;

  const city = await City.findOne({
    _id: id,
    createdBy: userId,
  });

  if (!city) {
    throw new NotFoundError(`No city with ID ${id}`);
  }

  res.status(StatusCodes.OK).json({ city });
};

const createCity = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;

    const city = await City.create(req.body);

    res.status(StatusCodes.CREATED).json({ city });
  } catch (error) {
    handleErrors(error, req);
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid input data" });
  }
};

const updateCity = async (req, res) => {
  const {
    user: { userId },
    params: { id },
  } = req;

  const { notes, date } = req.body;

  if (!notes || !date) {
    throw new BadRequestError("Notes or Date fields cannot be empty");
  }

  const updatedCity = await City.findOneAndUpdate(
    { _id: id, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedCity) {
    throw new NotFoundError(`No city found with ID ${id}`);
  }

  res.status(StatusCodes.OK).json({ message: "City updated successfully" });
};

const deleteCity = async (req, res) => {
  const {
    user: { userId },
    params: { id: cityId },
  } = req;

  const city = await City.findOneAndDelete({ _id: cityId, createdBy: userId });

  if (!city) {
    throw new NotFoundError(`No city found with ID ${cityId}`);
  }

  res.status(StatusCodes.OK).json({ message: "City deleted successfully" });
};

export { getCities, getCity, createCity, deleteCity, updateCity };
