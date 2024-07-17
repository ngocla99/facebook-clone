const express = require("express");
const commentController = require("../controllers/comment");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createComment", authUser, commentController.createComment);
router.post("/updateComment", authUser, commentController.updateComment);
router.delete("/deleteComment/:id", authUser, commentController.deleteComment);

module.exports = router;
