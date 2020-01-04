const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const PhotoUpload = require("../middleware/multer");

router.post("/login", UserController.login);

router.post("/signup", UserController.signup);

//TODO: Kullanıcı adıyla bilgileri çağırma
router.get("/:username", UserController.get_user_by_username);

router.post("/profileImg", PhotoUpload.single("profileImg"), UserController.upload_profile_photo);

router.post("/getRandomUser", UserController.get_random_users);

router.post("/searchUser", UserController.search_users);

module.exports = router;
