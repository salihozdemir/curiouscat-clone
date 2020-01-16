const mongoose = require("mongoose");
const Question = require("../models/question");
const Follow = require("../models/follow");
const User = require('../models/user');

exports.get_user_questions = (req, res, next) => {
  Question.find({
    toUser: req.body.toUserId,
    answerText: { $exists: req.body.answered }
  })
    .select("-__v")
    .limit(Number(req.body.limit))
    .skip(Number(req.body.page)* Number(req.body.limit))
    .populate("toUser fromUser", "username profileImg")
    .sort({ timeStamp: 'desc'})
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        questions: docs.map(doc => {
          return {
            _id: doc._id,
            toUser: doc.toUser,
            fromUser: doc.fromUser,
            isAnon: doc.isAnon,
            questionText: doc.questionText,
            answerText: doc.answerText,
            timeStamp: doc.timeStamp,
          };
        })
      };
      res.status(200).json(response);
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
    .then(result => {
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
};

exports.delete_question = (req, res, next) => {
  Question.findByIdAndRemove({ _id: req.params.questionId })
    .exec()
    .then(question => {
      if (!question) {
        res.status(404).json({
          message: "Question not found"
        });
      }
      User.findByIdAndUpdate(
        {_id: req.body.userId },
        { $inc: { answerCount: -1 } })
        .exec()
        .then(result => {
          res.status(200).json({
            message: "Question updated",
            success: true,
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
  Question.findOneAndUpdate(
    { _id: req.params.questionId },
    { $set: { answerText: req.body.value } },
  )
  .exec()
  .then(result => {
    User.findByIdAndUpdate(
      {_id: req.body.userId },
      { $inc: { answerCount: 1 } })
      .exec()
      .then(result => {
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
          res.status(200).json({
            count: result.length,
            questions: result
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
      })
    });
  })
  .catch(err => {
    res.status(500).json(err);
  });
};