const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const AdminController = require('../controllers/admin');

router.post("/createQuestion", checkAuth, AdminController.create_question);

router.post("/followToUser", checkAuth, AdminController.follow_to_user);

router.post("/userFollowAdmin", checkAuth, AdminController.user_Follow_Admin);

module.exports = router;