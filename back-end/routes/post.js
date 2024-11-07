const express = require("express")
const postController = require("../controllers/post")
const { authUser } = require("../middlewares/auth")
const {
  validateSavedPost,
  validateUnSavedPost,
} = require("../middlewares/validatePost")

const router = express.Router()

router
  .route("/")
  .get(authUser, postController.getAllPost)
  .post(authUser, postController.createPost)

router
  .route("/:id")
  .get(postController.getPost)
  .patch(authUser, postController.updatePost)
  .delete(authUser, postController.deletePost)

router.get("/saved", authUser, postController.getSavedPosts)
router.patch("/save", authUser, validateSavedPost, postController.savePost)
router.patch(
  "/unSave",
  authUser,
  validateUnSavedPost,
  postController.unSavePost
)

module.exports = router
