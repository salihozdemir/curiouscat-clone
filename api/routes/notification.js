const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const NotificationController = require("../controllers/notification");

router.post("/create", checkAuth, NotificationController.create_notification);

router.delete("/delete/:_id", checkAuth, NotificationController.delete_notification);

router.post("/get", checkAuth, NotificationController.get_notification);

module.exports = router;