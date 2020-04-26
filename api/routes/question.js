const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const QuestionController = require("../controllers/question");

// Get non-answered questions
router.post("/getUserQuestion", checkAuth, QuestionController.get_user_questions);

//Create question
router.post("/", checkAuth, QuestionController.create_question);

//Delete question
router.delete("/:questionId/:userId", checkAuth, QuestionController.delete_question);

//Answer a question
router.patch("/", checkAuth, QuestionController.answer_a_question);

//Get user's following user questions
router.post("/getFollowingQuestions", checkAuth, QuestionController.get_following_questions);

router.post("/randomQuestions", checkAuth, QuestionController.get_random_answered_questions)

module.exports = router;
