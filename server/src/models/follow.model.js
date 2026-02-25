const mongoose = require("mongoose");

const followSchema = mongoose.Schema(
  {
    follower: {
      type: String,
      required: [true, "follower is required"],
    },
    followee: {
      type: String,
      required: [true, "followee is required"],
    },
  },
  { timestamps: true },
);

followSchema.index({ follower: 1, followee: 1 }, { unique: true });

const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;
