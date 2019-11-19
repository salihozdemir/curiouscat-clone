const express = require("express");
const router = express.Router();

const FollowController = require('../controllers/follow');

router.post("/", FollowController.follow_or_unfollow);

router.post("/isFollow", FollowController.is_follow);

router.get("/getUserFollowers/:toUserId", FollowController.get_user_followers);

router.get("/getUserFollowing/:fromUserId", FollowController.get_user_following);

module.exports = router;