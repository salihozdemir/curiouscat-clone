const mongoose = require("mongoose");
const Follow = require("../models/follow");
const Question = require("../models/question");

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
              message: result.fromUser + " follow to" + result.toUser,
              isFollow: true,
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
              message: result.fromUser + " unfollow to " + result.toUser,
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

exports.get_user_followers = async (req, res, next) => {
  await Follow.find({ toUser: req.params.toUserId }, { _id: 0})
    .select('fromUser')
    .populate('fromUser','_id username profileImg')
    .exec()
    .then(docs => {
      let usersIds = [];
      docs.map(doc => {
        usersIds.push(doc.fromUser._id);
      });
      // Question.find({
      //   toUser: { $in: usersIds},
      //   answerText: { $exists: true }
      // })
      //   .exec()
      //   .then(docs => {
      //     console.log(docs);
      //   })
      console.log(usersIds);
      Question.aggregate([
        {
          $match: 
            {
              toUser: { $in: usersIds },
              answerText: { $exists: true } 
            }
        },
        // {
        //   $group: {
        //     _id: null,
        //     count: { $sum: 1 }
        //   }
        // }
      ])
      .exec()
      .then(result => {
        res.status(200).json(result);
      });
    //     res.status(200).json({
    //     count: docs.length,
    //     followers: docs.map(doc => {
    //       return {
    //         _id: doc.fromUser._id,
    //         username: doc.fromUser.username,
    //         profileImg: doc.fromUser.profileImg,
    //         answerCounts: [],
    //       }
    //     })    
    // })
    })
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