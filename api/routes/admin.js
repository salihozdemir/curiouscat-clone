const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const AdminController = require('../controllers/admin');

router.post("/createQuestion", checkAuth, AdminController.create_question);

router.post("/followToUser", checkAuth, AdminController.follow_to_user);

module.exports = router;