const express = require("express");
const router = express.Router();

const NotificationController = require("../controllers/notification");

router.post("/create", NotificationController.create_notification);

router.delete("/delete", NotificationController.delete_notification);

router.post("/get", NotificationController.get_notification);

module.exports = router;