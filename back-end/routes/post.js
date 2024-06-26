const express = require("express");
const postController = require("../controllers/post");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createPost", authUser, postController.createPost);

module.exports = router;
