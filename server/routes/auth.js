// Importing the express library for building web applications
const express = require("express");

// Importing body from express-validator for request validation
const { body } = require("express-validator");

// Importing custom middleware to check authentication
const isAuth = require("../middleware/is-auth");

// Importing the User model to interact with user data in the database
const User = require("../models/user");

// Importing the authentication controller to handle auth-related logic
const authController = require("../controller/auth");

// Creating an express router to define routes
const router = express.Router();

// Defining validation rules for the signup route
const signupValidation = [
  body("email")
    .isEmail()
    .withMessage("Pleae enter a validate email")
    .custom((email) => {
      return User.findOne({ email: email }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("Email Address already exists");
        }
      });
    })
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 5, max: 13 })
    .withMessage("Password must be between 5 and 13 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .withMessage(
      "Passtword must contain at least one character letter, one lowercase, one uppercase, one number and one special character "
    ),
  body("name").trim().not().isEmpty(),
];

// Defining the signup route with PUT method and applying validation
router.put("/signup", signupValidation, authController.signup);

// Defining the login route with POST method
router.post("/login", authController.login);

// Defining the route to get user status with GET method
router.get("/status", isAuth, authController.getUserStatus);
// Checking authentication and handling status retrieval in authController
router.patch(
  "/status",
  isAuth,
  [body("status").trim().not().isEmpty()],
  authController.updateUserStatus
);

module.exports = router;
// Exporting the router to be used in other parts of the application
