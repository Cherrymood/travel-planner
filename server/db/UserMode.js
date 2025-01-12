import { userSchema } from "./LoginSchema";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Add a method to verify password
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
