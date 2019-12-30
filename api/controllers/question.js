const mongoose = require("mongoose");
const Question = require("../models/question");
const Follow = require("../models/follow");

exports.get_user_questions = (req, res, next) => {
  Question.find({
    toUser: req.body.toUserId,
    fromUser: req.body.fromUserId,
    answerText: { $exists: req.body.answered }
  })
    .select("-__v")
    .populate("toUser fromUser", "username")
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
            answerText: doc.answerText
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
      res.status(200).json({
        message: "Question deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.answer_a_question = (req, res, next) => {
  Question.update(
    { _id: req.params.questionId },
    { $set: { answerText: req.body.value } }
  )
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Question updated"
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
        userArray.push(doc.fromUser);
      });
      Question.find({
        fromUser: { $all: userArray },
        answerText: { $exists: true }
      })
        .exec()
        .then(result => {
          res.status(200).json({
            count: result.length,
            questions: result
          });
        });
    });
};
