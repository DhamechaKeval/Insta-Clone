const express = require("express");
const {
  createPostController,
  getAllPostController,
  getPostDetailsController,
} = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware");

const postRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/posts/ [Protected]
// file upload in Imagekit.io cloud
postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  createPostController,
);

// GET /api/posts/ [Protected]
postRouter.get("/", identifyUser, getAllPostController);

// GET /api/posts/details/:postId [Protected]
// return a details about specific post with ID. also check whether the post belongs to he user that the rquest come from ..??
postRouter.get("/details/:postId", identifyUser, getPostDetailsController);

module.exports = postRouter;
