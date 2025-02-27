import City from "../models/City.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import parseValidationErrors from "../util/parseValidationErrors.js";

const getCities = async (req, res) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid user ID" });
  }

  try {
    const cities = await City.find({ createdBy: userId });

    if (!cities || cities.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Cities not found" });
    }

    cities.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    res.status(StatusCodes.OK).json({ cities, count: cities.length });
  } catch (error) {
    console.error("Error fetching cities:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while fetching cities." });
  }
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
    throw new NotFoundError(`No city found with ID ${id}`);
  }

  res.status(StatusCodes.OK).json({ city });
};

const createCity = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;

    console.log("Create city", req.body);

    const city = await City.create(req.body);

    res.status(StatusCodes.CREATED).json({ city });

  } catch (error) {

    if (error && error.name === 'ValidationError') {
      parseValidationErrors(error, req);
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid input data" });
    }

    console.error("Unexpected error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
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

  const city = await City.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.userId },
    req.body,
    { new: true, runValidators: true }
  );
  
  if (!city) {
    throw new NotFoundError(`No city found with ID ${req.params.id}`);
  }};
  

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
