const express = require("express");
const {
  createPostController,
  getAllPostController,
  getPostDetailsController,
  getFeedController,
  likePostController,
  dislikePostController,
} = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

/**
 * @route   POST /api/posts/
 * @desc    file upload in Imagekit.io cloud
 * @access  Private
 */
postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  createPostController,
);

/**
 * @route   GET /api/posts/
 * @desc    Fetch all post which is created by requested user
 * @access  Private
 */
postRouter.get("/", identifyUser, getAllPostController);

/**
 * @route   GET /api/posts/details/:postId
 * @desc    // return a details about specific post with ID. also check whether the post belongs to he user that the rquest come from ..??
 * @access  Private
 */
postRouter.get("/details/:postId", identifyUser, getPostDetailsController);

/**
 * @route   GET /api/posts/feed
 * @desc    to get all the post in feed
 * @access  Private
 */
postRouter.get("/feed", identifyUser, getFeedController);

/**
 * @route   POST /api/posts/like/:postId
 * @desc    to like the post
 * @access  Private
 */
postRouter.post("/like/:postId", identifyUser, likePostController);

/**
 * @route   POST /api/posts/dislike/:postId
 * @desc    to dislike the post if Liked
 * @access  Private
 */
postRouter.post("/dislike/:postId", identifyUser, dislikePostController);

module.exports = postRouter;
