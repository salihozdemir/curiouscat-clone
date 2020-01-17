const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Follow = require("../models/follow");


exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .select('-__v')
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'The email or password is incorrect. Please, try again',
          success: false
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'The email or password is incorrect. Please, try again',
            success: false
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user.username,
              userId: user._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1H'
            }
          );
          return res.status(200).json({
            message: 'Auth successful',
            token,
            userId: user._id,
            username: user.username,
            inboxCount: user.inboxCount,
            notificationCount: user.notificationCount,
            success: true
          });
        }
        return res.status(401).json({
          message: 'The email or password is incorrect. Please, try again',
          success: false
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        success: false,
        message: err.message
      });
    });
};

exports.signup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        return res.status(409).json({
          message: "Sorry, that emails's taken. Try another?",
          success: false
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
              success: false
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email.toLowerCase(),
              password: hash,
              username: req.body.username.toLowerCase()
            });
            user
              .save()
              .then(result => {
                const token = jwt.sign(
                  {
                    username: result.username,
                    userId: result._id
                  },
                  process.env.JWT_KEY,
                  {
                    expiresIn: '1H'
                  }
                );
                return res.status(201).json({
                  message: 'User created',
                  token,
                  userId: user._id,
                  username: user.username,
                  inboxCount: user.inboxCount,
                  notificationCount: user.notificationCount,
                  success: true
                });
              })
              .catch(err => {
                if (err.code === 11000) {
                  res.status(409).json({
                    message: "Sorry, that username's taken. Try another?",
                    success: false
                  });
                }
                res.status(500).json({
                  error: err,
                  success: false,
                  message: err.message
                });
              });
          }
        });
      }
    });
};

exports.get_user_by_username = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .exec()
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: 'User not found',
          success: false
        });
      }
      res.status(200).json({
        username: user.username,
        profileImg: user.profileImg,
        id: user._id,
        answerCount: user.answerCount,
        success: true
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        success: false
      });
    });
};

exports.upload_profile_photo = (req, res, next) => {
  const id = req.body.id;
  User.findOneAndUpdate({ _id : id }, { profileImg: req.file.filename })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "PP updated",
        profileImg: req.file.filename,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get_random_users = (req, res, next) => {
  Follow.find({ fromUser: req.body.fromUserId }, { '_id': 0,})
    .select('toUser')
    .exec()
    .then(docs => {
      let userFollowingIdies = [];
      docs.map(doc => {
        userFollowingIdies.push(doc.toUser);
      });
      User.aggregate([
        {
          $match: { _id: { $nin: userFollowingIdies, $ne: mongoose.Types.ObjectId(req.body.fromUserId) } }
        },
        {
          $sample: { size: 3 }
        },
        { 
          $project : { username : 1, _id : 1, profileImg: 1, answerCount: 1 } 
        }
        ])
        .exec()
        .then(docs => { 
          res.status(200).json({
            users: docs
          });
         //#region get for answerCount query
          // let usersIds = [];
          // docs.map(doc => {
          //   usersIds.push(doc._id);
          // });
          // Question.aggregate([
          //   {
          //     $match: {
          //         toUser: { $in: usersIds },
          //         answerText: { $exists: true } 
          //       }
          //   },
          //   {
          //     $group: {
          //       _id: '$toUser',
          //       answerCount: { $sum: 1 },
          //     }
          //   }
          // ])
          // .exec()
          // .then(result => {
          //   docs.map(doc => {
          //     doc.answerCount = 0;
          //     result.map(item => {
          //       if(String(doc._id) === String(item._id)){
          //         doc['answerCount'] = item.answerCount;
          //       }
          //     });
          //   });
          //   res.status(200).json({
          //     users: docs,
          //   });
          // });
          //#endregion
      });
    });
};

exports.search_users = (req, res, next) => {
  User.find({username : {$regex: req.body.username , $options: 'i'} })
    .lean()
    .select('-__v -password -email')
    .limit(10)
    .sort('username')
    .exec()
    .then(docs => {
      if(docs.length !== 0) {
        Follow.find({fromUser: req.body.fromUserId})
        .select('toUser -_id')
        .exec()
        .then(result => {
          docs.forEach(element => {
            element.following = false;
            result.forEach(item => {
              if(String(element._id) === String(item.toUser)) 
              element.following = true;
            });
          });
          res.status(200).json({
            users: docs
          });
        });
      } else {
        res.status(200).json({
          users: []
        });
      }
    });
};

