const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const UserController = require("../controllers/user");
const PhotoUpload = require("../middleware/multer");

router.post("/login", UserController.login);

router.post("/signup", UserController.signup);

router.get("/:username", checkAuth, UserController.get_user_by_username);

router.post("/profileImg", checkAuth, PhotoUpload.single("profileImg"), UserController.upload_profile_photo);

router.post("/getRandomUser", checkAuth, UserController.get_random_users);

router.post("/searchUser", checkAuth, UserController.search_users);

module.exports = router;
