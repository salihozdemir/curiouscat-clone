const mongoose = require("mongoose");
const Question = require("../models/question");
const Follow = require("../models/follow");
const User = require('../models/user');
const Notification = require("../models/notification");

exports.get_user_questions = (req, res, next) => {
  Question.find({ toUser: req.body.toUserId, answerText: { $exists: req.body.answered } })
    .select("-__v")
    .limit(Number(req.body.limit))
    .skip(Number(req.body.page)* Number(req.body.limit))
    .populate("toUser fromUser", "username profileImg")
    .sort({ timeStamp: 'desc'})
    .exec()
    .then(docs => {
      User.findOne({  _id: req.body.loginUserId})
      .select('-_id notificationCount inboxCount')
      .exec()
      .then(user => {
        res.status(200).json({
          questions: docs,
          inboxCount: user.inboxCount,
          notificationCount: user.notificationCount
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
    })
    .catch(err => {
      res.status(200).json({
        error: err
      });
    });
};

exports.create_question = (req, res, next) => {
  const question = new Question({
    _id: mongoose.Types.ObjectId(),
    toUser: req.body.toUserId,
    fromUser: req.body.fromUserId,
    isAnon: req.body.isAnon,
    questionText: req.body.questionText
  });
  question
    .save()
    .then(() => {
      User.findOneAndUpdate( {_id: req.body.toUserId }, { $inc: { inboxCount: 1 } })
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
};

exports.delete_question = (req, res, next) => {
  Question.findOneAndDelete({ _id: req.params.questionId })
    .exec()
    .then(question => {
      if (!question) {
        res.status(404).json({
          message: "Question not found"
        });
      }
      User.updateOne( {_id: req.params.userId }, { $inc: { inboxCount: -1 } })
        .exec()
        .then(() => {
          res.status(200).json({
            message: "Question deleted",
            success: true,
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
};

exports.answer_a_question = (req, res, next) => {
  // Soruyu bul, sorunun cevabını oluştur.
  Question.updateOne( { _id: req.body.questionId }, { $set: { answerText: req.body.answerText } })
  .exec()
  .then(() => {
    // Soruyu cevaplayan kişinin answerCount 1 arttır ve inboxCount 1 azalt.
    User.updateOne( { _id: req.body.fromUserId }, { $inc: { answerCount: 1, inboxCount: -1 } })
      .exec()
      .then(() => {
        // Soruyu soran kişinin notificationCount 1 arttır. Eğer kendisine soru soruyor ise notification oluşturmaz.
        if (req.body.fromUserId !== req.body.toUserId) {
          User.updateOne( {_id: req.body.toUserId}, { $inc: { notificationCount: 1 } })
          .exec()
          .then(() => {
            //Bildirim oluştur.
            const notification = new Notification({
              _id: mongoose.Types.ObjectId(),
              toUser: req.body.toUserId,
              fromUser: req.body.fromUserId,
              notificationText: 'answer your question.'
            });
            notification
              .save()
              .then(() => {
                res.status(200).json({
                  message: "Question updated",
                  success: true,
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err,
                });
              })
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
        }
        res.status(200).json({
          message: "Question updated",
          success: true,
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
};

exports.get_following_questions = (req, res, next) => {
  Follow.find({ fromUser: req.body.fromUserId })
    .exec()
    .then(docs => {
      let userArray = [];
      docs.map(doc => {
        userArray.push(doc.toUser);
      });
      Question.find({
        fromUser: { $in: userArray },
        answerText: { $exists: true }
      })
        .select("-__v")
        .limit(Number(req.body.limit))
        .skip(Number(req.body.page)* Number(req.body.limit))
        .populate("toUser fromUser", "username profileImg")
        .sort({ timeStamp: 'desc'})
        .exec()
        .then(result => {
          User.findOne({  _id: req.body.fromUserId})
          .select('-_id notificationCount inboxCount')
          .exec()
          .then(user => {
            res.status(200).json({
              count: result.length,
              questions: result,
              notificationCount: user.notificationCount,
              inboxCount: user.inboxCount
            });
          });
        });
    });
};

exports.get_random_answered_questions = (req, res, next) => {
  Question.aggregate([
    { 
      $match: { 
        toUser: { $ne: mongoose.Types.ObjectId(req.body.loginUserId)}, 
        fromUser: { $ne: mongoose.Types.ObjectId(req.body.loginUserId)}, 
        answerText: { $exists: true},
      }
    },
    { $sample: { size: Number(req.body.limit) } },
    {    
      $lookup: {
          from: 'users',
          localField: 'toUser',
          foreignField: '_id',
          as: 'toUser'
        }
    },
    {    
      $lookup: {
          from: 'users',
          localField: 'fromUser',
          foreignField: '_id',
          as: 'fromUser'
        }
    },
    {
      $project: {
        _id: 1, 
        'toUser.username': 1, 
        'toUser.profileImg': 1, 
        'fromUser.username': 1, 
        'fromUser.profileImg': 1, 
        isAnon: 1, 
        questionText: 1, 
        timeStamp: 1, 
        answerText: 1
      }
    },
    
  ])
  .exec()
  .then(result => {
    User.findOne({  _id: req.body.loginUserId})
    .select('-_id notificationCount inboxCount')
    .exec()
    .then(docs => {
      res.status(200).json({
        questions: result.map(x => {
          return {
            _id: x._id,
            toUser: {
              username: x.toUser[0].username,
              profileImg: x.toUser[0].profileImg
            },
            fromUser: {
              username: x.fromUser[0].username,
              profileImg: x.fromUser[0].profileImg
            },
            isAnon: x.isAnon,
            questionText: x.questionText,
            timeStamp: x.timeStamp,
            answerText: x.answerText,
          }
        }),
        notificationCount: docs.notificationCount,
        inboxCount: docs.inboxCount,
      });
    })
    .catch(err => {
      res.status(500).json(err);
    })
  })
  .catch(err => {
    res.status(500).json(err);
  });
};