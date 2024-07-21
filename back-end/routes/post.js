const express = require("express");
const postController = require("../controllers/post");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.get("/getAllPost", authUser, postController.getAllPost);
router.get("/getPost/:id", authUser, postController.getPost);
router.post("/createPost", authUser, postController.createPost);
router.post("/updatePost", authUser, postController.updatePost);

module.exports = router;
