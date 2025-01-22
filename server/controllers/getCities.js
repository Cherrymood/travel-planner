import City from "../models/City.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

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
  console.log("Req", req.params.id);

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
  req.body.createdBy = req.user.userId;

  const city = await City.create(req.body);

  res.status(StatusCodes.CREATED).json({ city });
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

  const city = await City.findByIdAndUpdate(
    {
      _id: id,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );
};

const deleteCity = async (req, res) => {
  const {
    user: { userId },
    params: { id: cityId },
  } = req;

  const city = await City.findByIdAndDelete({ _id: cityId, createdBy: userId });

  if (!city) {
    throw new NotFoundError(`No job with ${cityId}`);
  }

  res.status(StatusCodes.OK).json({ message: "City deleted successfully" });
};

export { getCities, getCity, createCity, deleteCity, updateCity };
