const express = require("express");
const identifyUser = require("../middlewares/auth.middleware");
const {
  userFollowController,
  userUnfollowController,
} = require("../controllers/user.controller");

const userRouter = express.Router();

/**
 * @route   POST /api/user/follow/:username
 * @desc    follow other person
 * @access  Private
 */
userRouter.post("/follow/:username", identifyUser, userFollowController);

/**
 * @route   POST /api/user/unfollow/:username
 * @desc    unfollow other person
 * @access  Private
 */
userRouter.post("/unfollow/:username", identifyUser, userUnfollowController);

module.exports = userRouter;
