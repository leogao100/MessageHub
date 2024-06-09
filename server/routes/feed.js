const express = require("express");

const { body } = require("express-validator");

const isAuth = require("../middleware/is-auth");

const feedController = require("../controller/feed");

const router = express.Router();

const postValidation = [
  body("title")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters"),
  body("content")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Content must be at least 5 characters"),
];
// Route to get all posts
// Checking authentication and handling retrieval of all posts in feedController
router.get("/posts", isAuth, feedController.getPosts);

router.post("/createpost", isAuth, postValidation, feedController.createPost);

router.put("/post/:postId", isAuth, postValidation, feedController.updatePost);

router.delete("/post/:postId", isAuth, feedController.deletePost);

module.exports = router;
