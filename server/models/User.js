import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 25,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    select: false,
  },
  googleId: {
    type: String,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

UserSchema.statics.checkExistUser = async function (body) {
  const { email, password } = body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  return user;
};

export default mongoose.model("User", UserSchema);

///Why checkExistUser Should Be Static
// Collection-Level Operation:
// checkExistUser operates at the collection level because it involves searching for a user in the database (e.g., using findOne).
// It does not rely on an existing document instance since you're trying to find the document in the first place.
// No Access to Specific Document:
// When a user is trying to log in, you don't already have a User document instance to work with. You need to search for it using the static method.
// Consistency with Mongoose Practices:
// Static methods are typically used in Mongoose for operations like querying the database or performing utility functions that don't require document instance data.
