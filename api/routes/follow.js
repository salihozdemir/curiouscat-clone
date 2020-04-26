const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const FollowController = require('../controllers/follow');

router.post("/", checkAuth, FollowController.follow_or_unfollow);

router.post("/isFollow", checkAuth, FollowController.is_follow);

router.get("/getUserFollowers/:toUserId", checkAuth, FollowController.get_user_followers);

router.get("/getUserFollowing/:fromUserId", checkAuth, FollowController.get_user_following);

module.exports = router;