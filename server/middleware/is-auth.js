// Load environment variables from the .env file
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  // If the Authorization header is not present
  // Create an error object with the message "Not Authenticated"
  // Set the error status code to 401 (Unauthorized)
  // Pass the error to the next middleware (error handling middleware)

  if (!authHeader) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  // If the decoded token is not valid
  // Create an error object with the message "Not authenticated"
  // Set the error status code to 401 (Unauthorized)
  // Pass the error to the next middleware (error handling middleware)
  if (!decodedToken) {
    const error = new Error("No Authenticated");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};

