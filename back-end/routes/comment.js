const express = require("express");
const commentController = require("../controllers/comment");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createComment", authUser, commentController.createComment);

module.exports = router;
