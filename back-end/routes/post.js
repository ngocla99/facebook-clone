const express = require("express");
const postController = require("../controllers/post");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createPost", authUser, postController.createPost);
router.post("/createPost", authUser, postController.getAllPosts);

module.exports = router;
