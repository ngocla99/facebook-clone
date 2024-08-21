const express = require("express");
const postController = require("../controllers/post");
const { authUser } = require("../middlewares/auth");
const {
  validateSavedPost,
  validateUnSavedPost,
} = require("../middlewares/validatePost");

const router = express.Router();

router.get("/getAllPost", authUser, postController.getAllPost);
router.get("/getPost/:id", postController.getPost);
router.post("/createPost", authUser, postController.createPost);
router.post("/updatePost", authUser, postController.updatePost);
router.delete("/deletePost/:id", authUser, postController.deletePost);
router.patch("/savePost", authUser, validateSavedPost, postController.savePost);
router.patch(
  "/unSavePost",
  authUser,
  validateUnSavedPost,
  postController.unSavePost
);

module.exports = router;
