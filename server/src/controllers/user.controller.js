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
      message: `You are Alrady send follow request to ${followeeUsername}.`,
      follow: isAlradyFollow,
    });
  }

  const follow = await Follow.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `Follow request send succesfully to ${followeeUsername}.`,
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
    status: "accept",
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

const followAcceptController = async (req, res) => {
  const followerUsername = req.params.username;
  const myUsername = req.user.username;

  // find document from follow modle
  const follow = await Follow.findOne({
    follower: followerUsername,
    followee: myUsername,
  });

  // koi pending request nahi mili
  if (!follow) {
    return res.status(404).json({
      message: `No follow request found.`,
    });
  }

  // alrady request reject ho gai hai
  if (follow.status === "reject") {
    return res.status(409).json({
      message: `You have alrady reject the follow request.`,
      follow,
    });
  }

  // alrady request accept ho gai hai
  if (follow.status === "accept") {
    return res.status(409).json({
      message: `You have alrady accept the follow request.`,
      follow,
    });
  }

  // pending -> accept
  follow.status = "accept";
  await follow.save();

  res.status(200).json({
    message: `Follow request Accepted. ${followerUsername} follow you.`,
    follow,
  });
};

const followRejectController = async (req, res) => {
  const followerUsername = req.params.username;
  const myUsername = req.user.username;

  // find document from follow modle
  const follow = await Follow.findOne({
    follower: followerUsername,
    followee: myUsername,
  });

  // koi pending request nahi mili
  if (!follow) {
    return res.status(404).json({
      message: `No follow request found.`,
    });
  }

  // alrady request reject ho gai hai
  if (follow.status === "reject") {
    return res.status(409).json({
      message: `You have alrady rejected the follow request.`,
      follow,
    });
  }

  // alrady request accept ho gai hai
  if (follow.status === "accept") {
    return res.status(409).json({
      message: `You have alrady accept the follow request.`,
      follow,
    });
  }

  // pending -> accept
  follow.status = "reject";
  await follow.save();

  res.status(200).json({
    message: `Follow request Rejected of${followerUsername}.`,
    follow,
  });
};

const followPendingListController = async (req, res) => {
  myUsername = req.user.username;

  const pending = await Follow.find({
    followee: myUsername,
    status: "pending",
  });

  if (pending.length === 0) {
    return res.status(200).json({
      message: `Currently you have not any pending Follow request`,
    });
  }

  res.status(200).json({
    message: `Pending follow request list`,
    request: pending.map((item) => ({
      follower: item.follower,
      status: item.status,
    })),
  });
};

// whom i follow
const followingListController = async (req, res) => {
  const myUsername = req.user.username;

  const following = await Follow.find({
    follower: myUsername,
    status: "accept",
  });

  res.status(200).json({
    message: `Following list.`,
    following: following.map((item) => ({
      usrename: item.followee,
    })),
  });
};

// who follow me
const followersListController = async (req, res) => {
  const myUsername = req.user.username;

  const followers = await Follow.find({
    followee: myUsername,
    status: "accept",
  });

  res.status(200).json({
    message: `Followers list.`,
    following: followers.map((item) => ({
      usrename: item.follower,
    })),
  });
};

module.exports = {
  userFollowController,
  userUnfollowController,
  followAcceptController,
  followRejectController,
  followPendingListController,
  followingListController,
  followersListController,
};
