const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "postId is required for like."],
    },
    username: {
      type: String,
      required: [true, "username is required for like."],
    },
  },
  { timestamp: true },
);

likeSchema.index({ postId: 1, username: 1 }, { unique: true });

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
