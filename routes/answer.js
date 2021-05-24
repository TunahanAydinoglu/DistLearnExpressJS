const express = require("express");

const {
    getSingleAnswer,
    getAllAnswersByQuestion,
    addNewAnswerToQuestion,
    editAnswer,
    deleteAnswer,
    likeAnswer,
    undoLikeAnswer,
    dislikeAnswer,
    undoDislikeAnswer
} = require("../controllers/answer");

const {
    getAccessToRoute,
    getAnswerOwnerAccess
} = require("../middlewares/authorization/auth");

const {
    checkQuestionAndAnswerExist,
    checkQuestionExist
} = require("../middlewares/database/databaseErrorHelpers");

const router = express.Router({mergeParams:true});

router.get("/",checkQuestionExist,getAllAnswersByQuestion);
router.get("/:answer_id/like",[checkQuestionAndAnswerExist,getAccessToRoute],likeAnswer);
router.get("/:answer_id/undo_like",[checkQuestionAndAnswerExist,getAccessToRoute],undoLikeAnswer);
router.get("/:answer_id/dislike",[checkQuestionAndAnswerExist,getAccessToRoute],dislikeAnswer);
router.get("/:answer_id/undo_dislike",[checkQuestionAndAnswerExist,getAccessToRoute],undoDislikeAnswer);
router.get("/:answer_id",checkQuestionAndAnswerExist,getSingleAnswer);
router.post("/",[getAccessToRoute,checkQuestionExist],addNewAnswerToQuestion);
router.put("/:answer_id/edit",[checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess],editAnswer);
router.delete("/:answer_id/delete",[checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess],deleteAnswer);

module.exports = router;
