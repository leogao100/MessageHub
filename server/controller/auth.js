// Load environment variables from a .env file into process.env
require("dotenv").config();
// Import bcrypt for hashing passwords
const bcrypt = require("bcrypt");
// Import validationResult to handle validation results from express-validator
const { validationResult } = require("express-validator");
// Import the User model for interacting with the user collection in the database
const User = require("../models/user");
// Import jsonwebtoken to create and verify JWTs
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  try {
    const hashedPwd = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPwd,
      name: name,
    });
    const result = await user.save();
    res.status(201).json({
      message: "User Created",
      userId: result._id,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Login controller function for authenticating a user
exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("A user with this email could not be found");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }
    const token = await jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      process.env.JWT_SECRETKEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString(),
    });
  } catch (error) {
    // Catch any errors that occur during the process
    // If the error does not have a status code, set it to 500 (internal server error)
    // Pass the error to the next middleware
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User Not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ status: user.status });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  const newStatus = req.body.status;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    user.status = newStatus;
    await user.save();
    res.status(200).json({
      message: "User status updated",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
