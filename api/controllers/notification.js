const mongoose = require("mongoose");
const Notification = require("../models/notification");

exports.create_notification = (req, res, next) => {
  const notification = new Notification({
    _id: mongoose.Types.ObjectId(),
    toUser: req.body.toUserId,
    fromUser: req.body.fromUserId,
    notificationText: req.body.notificationText,
  });
  notification
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created notification successful",
        success: true
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_notification = (req, res, next) => {
  Notification.deleteMany({ toUser: req.body.notificationIds})
  .exec()
  .then(result => {
    if(!result){
      res.status(404).json({
        message: "Notifications not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Notifications deleted",
      success: true,
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err,
      success: false
    });
  });
};

exports.get_notification = (req, res, next) => {
  Notification.find({ toUser: req.body.toUserId })
  .select('-__v')
  .populate('fromUser','profileImg, username')
  .exec()
  .then(result => {
    res.status(200).json({
      notifications: result
    });
  });
};