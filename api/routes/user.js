const express = require("express");
const router = express.Router();


const UserController = require("../controllers/user");

router.post("/login", UserController.login);

router.post("/signup", UserController.signup);

//TODO: Kullanıcı adıyla bilgileri çağırma
router.get("/:username", UserController.get_user_by_username);

module.exports = router;
