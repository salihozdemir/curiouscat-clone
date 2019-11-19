const mongoose = require("mongoose");
const Follow = require("../models/follow");

exports.follow_or_unfollow = (req, res, next) => {
  Follow.findOne({ toUser: req.body.toUserId, fromUser: req.body.fromUserId })
    .exec()
    .then(result => {
      if (!result) {
        const follow = new Follow({
          _id: mongoose.Types.ObjectId(),
          toUser: req.body.toUserId,
          fromUser: req.body.fromUserId
        });
        follow
          .save()
          .then(result => {
            res.status(201).json({
              message: result.fromUser + " follow to" + result.toUser
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      } else {
        Follow.findOneAndDelete({
          toUser: req.body.toUserId,
          fromUser: req.body.fromUserId
        })
          .exec()
          .then(result => {
            res.status(200).json({
              message: result.fromUser + " unfollow to " + result.toUser
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      }
    });
};

exports.is_follow = (req, res, next) => {
  Follow.findOne({ toUser: req.body.toUserId, fromUser: req.body.fromUserId })
    .exec()
    .then(result => {
      let isFollow;
      if (result) {
        isFollow = true;
      } else {
        isFollow = false;
      }
      res.status(200).json({
        isFollow
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_user_followers = (req, res, next) => {
  Follow.find({ toUser: req.params.toUserId })
    .populate('fromUser','username _id')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        followers: docs.map(doc => {
          return {
            _id: doc.fromUser._id,
            username: doc.fromUser.username
          }
        })    
      });
    });
};

exports.get_user_following = (req, res, next) => {
  Follow.find({ fromUser: req.params.fromUserId })
    .populate('toUser','username _id')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        following: docs.map(doc=> {
          return {
            _id: doc.toUser._id,
            username: doc.toUser.username
          }
        })
      });
    });
};