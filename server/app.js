require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.3hfac5y.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority&appName=${process.env.MONGODB_APP}`;

const app = express();

// Setting up middleware for body parsing and file uploads.
// Handling Cross-Origin Resource Sharing (CORS).
// Defining routes for the feed and authentication.

// Connecting to MongoDB.
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    // Starting the server.
    app.listen(process.env.MONGODB_PORT || 8080, () => {
      console.log(
        "Server is running on the port" + process.env.MONGODB_PORT || 8080
      );
    });
  })
  .catch((err) => {
    console.log("Database connection failed:"), err;
  });
