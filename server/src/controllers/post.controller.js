const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const Post = require("../models/post.model");
const Like = require("../models/like.model");

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

const getFeedController = async (req, res) => {
  const user = req.user.username;
  const feed = await Promise.all(
    (await Post.find().populate("user", "-password").lean()).map(
      async (post) => {
        const isLiked = await Like.findOne({
          username: user,
          postId: post._id,
        });

        post.isLiked = !!isLiked;
        return post;
      },
    ),
  );

  res.status(200).json({
    message: "Fetch all Post in the feed",
    feed,
  });
};

const likePostController = async (req, res) => {
  const username = req.user.username;
  const postId = req.params.postId;

  const isPostExists = await Post.findById(postId);

  if (!isPostExists) {
    return res.status(404).json({
      message: `Post not found.`,
    });
  }

  const isAlradyLiked = await Like.findOne({
    postId,
    username,
  });

  if (isAlradyLiked) {
    return res.status(201).json({
      message: `You have alrady liked this post.`,
      like: isAlradyLiked,
    });
  }

  const like = await Like.create({
    postId,
    username,
  });

  res.status(201).json({
    message: `You have liked this post successfully.`,
    like,
  });
};

const dislikePostController = async (req, res) => {
  const username = req.user.username;
  const postId = req.params.postId;

  const isPostExists = await Post.findById(postId);

  if (!isPostExists) {
    return res.status(404).json({
      message: `Post not found.`,
    });
  }

  const isPostLiked = await Like.findOne({
    postId,
    username,
  });

  if (!isPostLiked) {
    return res.status(404).json({
      message: `You have alrady not like this post.`,
    });
  }

  await Like.findByIdAndDelete(isPostLiked._id);

  res.status(201).json({
    message: `you have successfully dislike this post.`,
  });
};

module.exports = {
  createPostController,
  getAllPostController,
  getPostDetailsController,
  getFeedController,
  likePostController,
  dislikePostController,
};
