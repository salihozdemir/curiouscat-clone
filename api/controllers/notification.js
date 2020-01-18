const mongoose = require("mongoose");
const Notification = require("../models/notification");
const User = require('../models/user');

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
      User.findOneAndUpdate(
        {_id: req.body.toUserId },
        { $inc: { notificationCount: 1 } })
        .exec()
        .then(docs => {
          res.status(201).json({
            message: "Created notification successful",
            success: true
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_notification = (req, res, next) => {
  Notification.findOneAndDelete({ _id: req.body._id})
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
  Notification.find({ toUser: req.body.loginUserId })
  .select('-__v')
  .populate('fromUser','profileImg, username')
  .exec()
  .then(result => {
    if(result) {
      Notification.updateMany({toUser: mongoose.Types.ObjectId(req.body.toUserId), isViewed: false}, {$set: {isViewed: true}})
      .exec()
      .then(() => {
        User.findOneAndUpdate(
          {_id: req.body.loginUserId }, { $set: { notificationCount: 0 } })
          .select('inboxCount -_id')
          .exec()
          .then(user => {
            res.status(200).json({
              notifications: result,
              inboxCount: user.inboxCount
            });
        });
      })
    }
  });
};