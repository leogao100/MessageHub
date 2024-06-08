// Importing the mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Creating a shorthand alias for mongoose.Schema
const Schema = mongoose.Schema;

// Defining the schema for a post document in MongoDB
const postSchema = new Schema({
  // Field to store post's title
  title: {
    type: String,
    require: true,
  },
  // Field to store post's image URL
  imageUrl: {
    tyoe: String,
    require: true,
  },
  // Specifies that the content field should be a string
  content: {
    type: String,
    require: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

model.exports = mongoose.model("Post", postSchema);
