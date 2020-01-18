const mongoose = require("mongoose");
const Follow = require("../models/follow");
const Notification = require("../models/notification");
const User = require('../models/user');

exports.follow_or_unfollow = (req, res, next) => {
  // Kullanıcıyı takip edip etmediğini sorgular.
  Follow.findOne({ toUser: req.body.toUserId, fromUser: req.body.fromUserId })
    .exec()
    .then(result => {
      // Kullanıcı takip etmiyor ise takip eder. Ediyor ise takipten çıkarır.
      if (!result) {
        const follow = new Follow({
          _id: mongoose.Types.ObjectId(),
          toUser: req.body.toUserId,
          fromUser: req.body.fromUserId
        });
        follow
          .save()
          .then(docs => {
            //Takip edilen kişinin notificationCount'ını 1 arttırır.
            User.updateOne(
              {_id: req.body.toUserId },
              { $inc: { notificationCount: 1 } })
              .exec()
              .then(() => {
                // Takip edilen kişiye notification oluşturur.
                const notification = new Notification({
                  _id: mongoose.Types.ObjectId(),
                  toUser: req.body.toUserId,
                  fromUser: req.body.fromUserId,
                  notificationText: req.body.fromUsername  + ' follow you.'
                });
                notification
                  .save()
                  .then(() => {
                    res.status(201).json({
                      message: 'Follow',
                      buttonText: 'unFollow',
                      toUserId: docs.toUser,
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
      } else {
        Follow.findOneAndDelete({
          toUser: req.body.toUserId,
          fromUser: req.body.fromUserId
        })
          .exec()
          .then(result => {
            res.status(200).json({
              message: 'unFollow',
              buttonText: 'Follow',
              toUserId: result.toUser,
              isFollow: false,
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
      res.status(200).json({
        isFollow: result ? true : false
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_user_followers = (req, res, next) => {
  Follow.find({ toUser: req.params.toUserId }, { _id: 0})
    .select('fromUser')
    .populate('fromUser','_id username profileImg answerCount')
    .exec()
    .then(docs => {
      res.status(200).json({
        users: docs.map(doc => {
          return {
            _id: doc.fromUser._id,
            username: doc.fromUser.username,
            profileImg: doc.fromUser.profileImg,
            answerCount: doc.fromUser.answerCount
          }
        })
      });
    });
};

exports.get_user_following = (req, res, next) => {
  Follow.find({ fromUser: req.params.fromUserId })
    .populate('toUser','_id username profileImg answerCount')
    .exec()
    .then(docs => {
      res.status(200).json({
        users: docs.map(doc => {
          return {
            _id: doc.toUser._id,
            username: doc.toUser.username,
            profileImg: doc.toUser.profileImg,
            answerCount: doc.toUser.answerCount
          }
        })
      });
    });
};