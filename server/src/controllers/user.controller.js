const Follow = require("../models/follow.model");
const User = require("../models/user.model");

const userFollowController = async (req, res) => {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername == followeeUsername) {
    return res.status(404).json({
      message: "You can not Follow yourself.",
    });
  }

  const isFolloweeExists = await User.findOne({ username: followeeUsername });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: `Any user not exists with ${followeeUsername} username.`,
    });
  }

  const isAlradyFollow = await Follow.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlradyFollow) {
    return res.status(200).json({
      message: `You are Alrady following ${followeeUsername}.`,
      follow: isAlradyFollow,
    });
  }

  const follow = await Follow.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `Now you following ${followeeUsername}`,
    follow,
  });
};

const userUnfollowController = async (req, res) => {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername == followeeUsername) {
    return res.status(404).json({
      message: "You can not Unfollow yourself.",
    });
  }

  const isUserFollowing = await Follow.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following ${followeeUsername}.`,
    });
  }

  await Follow.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`,
  });
};

module.exports = { userFollowController, userUnfollowController };
