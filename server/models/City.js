import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
  cityName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
    unique: true,
  },
  country: {
    type: String,
    required: true,
    maxlength: 25,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  emoji: {
    type: String,
    maxlength: 5,
  },
  notes: {
    type: String,
    maxlength: 500,
    default: "",
  },
  position: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
});

const City = mongoose.model("City", CitySchema);

export default City;
