// Importing the mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Creating a shorthand alias for mongoose.Schema
const Schema = mongoose.Schema;

// Defining the schema for a user document in MongoDB
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  posts: {
    // Specifies that each post reference should be an ObjectId
    type: Schema.Types.ObjectId,
    // References the Post model
      ref: "Post",
  },
});

// Exporting the User model based on user schema to be used in other parts of the application
model.exports = mongoose.model("User", userSchema);

