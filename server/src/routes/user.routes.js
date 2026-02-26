const express = require("express");
const identifyUser = require("../middlewares/auth.middleware");
const {
  userFollowController,
  userUnfollowController,
  followAcceptController,
  followRejectController,
  followPendingListController,
  followingListController,
  followersListController,
} = require("../controllers/user.controller");

const userRouter = express.Router();

/**
 * @route   POST /api/user/follow/:username
 * @desc    follow request to other person
 * @access  Private
 */
userRouter.post("/follow/:username", identifyUser, userFollowController);

/**
 * @route   POST /api/user/follow/accept/:username
 * @desc    user accept the pending request
 * @access  Privaete
 */
userRouter.post(
  "/follow/accept/:username",
  identifyUser,
  followAcceptController,
);

/**
 * @route   POST /api/user/follow/reject/:username
 * @desc    user reject the pending request
 * @access  Privaete
 */
userRouter.post(
  "/follow/reject/:username",
  identifyUser,
  followRejectController,
);

/**
 * @route   GET /api/user/follow/pendinglist
 * @desc    user can feth pending follow request list
 * @access  Private
 */
userRouter.get(
  "/follow/pendinglist",
  identifyUser,
  followPendingListController,
);

/**
 * @route   GET /api/user/followinglist
 * @desc    user can feth following list whome i follow
 * @access  Private
 */
userRouter.get("/followinglist", identifyUser, followingListController);
/**
 * @route   GET /api/user/followerslist
 * @desc    user can feth followers list who follows me
 * @access  Private
 */
userRouter.get("/followerslist", identifyUser, followersListController);

/**
 * @route   POST /api/user/unfollow/:username
 * @desc    unfollow other person 
 * @access  Private
 */
userRouter.post("/unfollow/:username", identifyUser, userUnfollowController);

module.exports = userRouter;
