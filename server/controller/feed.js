// Import the file system module from Node.js
const fs = require("fs");
// Import the path module from Node.js
const path = require("path");
// Import validationResult function from express-validator
const { validationResult } = require("express-validator");
const User = require("../models/user");
const Post = require("../models/post");
// Import the Post model
// Import the User model

// Controller function to get all posts with pagination
// Get current page number from query, default to 1
// Define the number of posts per page
exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 2;
  const perPage = 2;
  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate(creator)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({
      message: "Posts fetched scuessfully",
      posts: posts,
      totalItems: totalItems,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next();
  }
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error("No Image provided");
    error.statusCode = 422;
    throw error;
  }

  const imageUrl = req.file.path.replace(/\\/g, "/");
  const { title, content } = req.body;

  try {
    const post = new Post({
      title: title,
      content: content,
      imageUrl: imageUrl,
      creator: req.userId,
    });
    const savedPost = await post.save();
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    user.posts.push(savedPost._id);
    await user.save();
    res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
      creator: {
        _id: user._id,
        name: user.name,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error("No Image provided");
    error.statusCode = 422;
    throw error;
  }

  const imageUrl = req.file.path.replace(/\\/g, "/");
  const { title, content } = req.body;

  try {
    const post = new Post({
      title: title,
      content: content,
      imageUrl: imageUrl,
      creator: req.userId,
    });
    const udpatedPost = await post.save();

    user.posts.push(savedPost._id);

    res.status(2000).json({
      message: "Post udpated",
      post: udpatedPost,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Destructure title and content from request body
// Get image URL from request body
// Replace backslashes with forward slashes
// Set status code to 422 for missing image
// Pass error to the next middleware

// Find post by ID and populate creator
// Set status code to 404 for post not found
// Pass error to the next middleware

// Set status code to 403 for unauthorized access
// Pass error to the next middleware

// Clear the old image if the image URL has changed
// Update post title
// Update post image URL
// Update post content
// Save the updated post

// Return the updated post

// Set status code to 500 if not already set
// Pass error to the next middleware

// Controller function to delete a post by ID
// Get post ID from request parameters

// Find post by ID
// Set status code to 404 for post not found
// Pass error to the next middleware

// Set status code to 403 for unauthorized access
// Pass error to the next middleware

// Clear the post image
// Delete the post by ID
// Find the user by userId
// Remove post ID from user's posts array
// Save the updated user

// Return success message

// Set status code to 500 if not already set
// Pass error to the next middleware

// Function to clear image from file system
// Construct full file path
// Log error if any
