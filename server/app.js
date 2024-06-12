require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.3hfac5y.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority&appName=${process.env.MONGODB_APP}`;

const authRoutes = require("./routes/auth");
const feedRoutes = require("./routes/feed");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
);

app.use("/images", express.static(path.join(__dirname, "images")))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET,POST,PUT,PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(`Errors occured in ${req.method} ${req.url}`);
  console.log(error);
  const statusCode = error.statusCode || 500;

  const message =
    error.message === 500 ? "Interal Server Error" : error.message;

  const data = error.data;

  res.status(statusCode).json({
    status: "error",
    statusCode: statusCode,
    message: message,
    ...(data && { data }),
  });
});

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
