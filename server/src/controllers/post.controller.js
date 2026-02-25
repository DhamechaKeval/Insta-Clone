const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
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

  const token = req.cookies.token;

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401).json({
      message: "user not authorised",
    });
  }

  const post = await Post.create({
    caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "Post created Succesfully",
    post,
  });
};

module.exports = { createPostController };
