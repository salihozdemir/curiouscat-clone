const express = require("express");
const router = express.Router();

const QuestionController = require("../controllers/question");

// Get non-answered questions
router.post("/getUserQuestion", QuestionController.get_user_questions);

//Create question
router.post("/", QuestionController.create_question);

//Delete question
router.delete("/:questionId", QuestionController.delete_question);

//Answer a question
router.patch("/:questionId", QuestionController.answer_a_question);

//Get users user questions
router.get("/getFollowerQuestions", QuestionController.get_following_questions);



module.exports = router;
