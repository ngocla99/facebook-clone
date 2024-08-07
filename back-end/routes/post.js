const express = require("express");
const postController = require("../controllers/post");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.get("/getAllPost", postController.getAllPost);
router.get("/getPost/:id", postController.getPost);
router.post("/createPost", authUser, postController.createPost);
router.post("/updatePost", authUser, postController.updatePost);
router.delete("/deletePost/:id", authUser, postController.deletePost);

module.exports = router;
