const mongoose = require("mongoose");

const followSchema = mongoose.Schema(
  {
    follower: {
      ref: "users",
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "follower is required"],
    },
    followee: {
      ref: "users",
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "followee is required"],
    },
  },
  { timestamp: true },
);

const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;
