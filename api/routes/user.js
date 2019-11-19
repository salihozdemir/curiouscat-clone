const express = require("express");
const router = express.Router();


const UserController = require("../controllers/user");

router.post("/login", UserController.login);

router.post("/signup", UserController.signup);

//TODO: Kullanıcı adıyla bilgileri çağırma
router.get("/:username", );

module.exports = router;
