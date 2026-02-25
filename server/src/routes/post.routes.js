const express = require("express");
const {
  createPostController,
  getAllPostController,
  getPostDetailsController,
} = require("../controllers/post.controller");

const postRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/posts/ [Protected]
// file upload in Imagekit.io cloud
postRouter.post("/", upload.single("image"), createPostController);

// GET /api/posts/ [Protected]
postRouter.get("/", getAllPostController);

// GET /api/posts/details/:postId [Protected]
// return a details about specific post with ID. also check whether the post belongs to he user that the rquest come from ..??
postRouter.get("/details/:postId", getPostDetailsController);

module.exports = postRouter;
