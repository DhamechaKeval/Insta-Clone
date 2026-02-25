const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const Post = require("../models/post.model");

const Imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const createPostController = async (req, res) => {
  const { caption } = req.body;

  const file = await Imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: req.file.originalname,
    folder: "Insta-clone-posts",
  });
  
  const post = await Post.create({
    caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created Succesfully",
    post,
  });
};

const getAllPostController = async (req, res) => {
  const userId = req.user.id;

  const posts = await Post.find({ user: userId });

  res.status(200).json({
    message: "Fetched Notes succcessfully",
    posts,
  });
};

const getPostDetailsController = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "User can not access this post",
    });
  }

  res.status(200).json({
    message: "Post details Fetched successfully",
    post,
  });
};

module.exports = {
  createPostController,
  getAllPostController,
  getPostDetailsController,
};
