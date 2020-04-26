const mongoose = require("mongoose");
const Question = require("../models/question");
const Follow = require("../models/follow");
const User = require('../models/user');
const Notification = require("../models/notification");


exports.create_question = (req, res, next) => {
  User.findOne({ username: 'admin' })
  .exec()
  .then(result => {
    if(!result){
      res.status(404).json({
        message: 'Admin account not found'
      })
    }
    const question = new Question({
      _id: mongoose.Types.ObjectId(),
      toUser: req.body.toUserId,
      fromUser: result._id,
      isAnon: req.body.isAnon,
      questionText: req.body.questionText
    });
    question
      .save()
      .then(() => {
        User.updateOne( {_id: req.body.toUserId }, { $inc: { inboxCount: 1 } })
        .exec()
        .then(() => {
          res.status(201).json({
            message: "Created question successful",
            success: true
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });  
  });
};

exports.follow_to_user = (req, res, next) => {
  User.findOne({ username: 'admin' })
  .exec()
  .then(result => {
    if(!result){
      res.status(404).json({
        message: 'Admin account not found'
      })
    }
    const follow = new Follow({
      _id: mongoose.Types.ObjectId(),
      toUser: req.body.toUserId,
      fromUser: result._id
    });
    follow
      .save()
      .then(() => {
        User.updateOne(
          {_id: req.body.toUserId },
          { $inc: { notificationCount: 1 } })
          .exec()
          .then(() => {
            const notification = new Notification({
              _id: mongoose.Types.ObjectId(),
              toUser: req.body.toUserId,
              fromUser: result._id,
              notificationText: 'follow you.'
            });
            notification
              .save()
              .then(() => {
                res.status(201).json({
                  message: 'Follow',
                  buttonText: 'unFollow',
                  isFollow: true,
                })
              })
              .catch(err => {
                res.status(500).json({
                  error: err,
                });
              })
          })
          .catch(err => {
            res.json(500).json({
              error: err,
            })
          })
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      }); 
  });
}

exports.user_Follow_Admin = (req, res, next) => {
  User.findOne({ username: 'admin' })
  .exec()
  .then(result => {
    if(!result){
      res.status(404).json({
        message: 'Admin account not found'
      })
    }
    const follow = new Follow({
      _id: mongoose.Types.ObjectId(),
      toUser: result._id,
      fromUser: req.body.fromUserId
    });
    follow
      .save()
      .then(() => {
        User.updateOne(
          {_id: req.body.toUserId },
          { $inc: { notificationCount: 1 } })
          .exec()
          .then(() => {
            const notification = new Notification({
              _id: mongoose.Types.ObjectId(),
              toUser: result._id,
              fromUser: req.body.fromUserId,
              notificationText: 'follow you.'
            });
            notification
              .save()
              .then(() => {
                res.status(201).json({
                  message: 'Follow',
                  buttonText: 'unFollow',
                  isFollow: true,
                })
              })
              .catch(err => {
                res.status(500).json({
                  error: err,
                });
              })
          })
          .catch(err => {
            res.json(500).json({
              error: err,
            })
          })
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      }); 
  });
}