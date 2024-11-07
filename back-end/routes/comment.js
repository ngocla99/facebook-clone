const express = require("express")
const commentController = require("../controllers/comment")
const { authUser } = require("../middlewares/auth")

const router = express.Router()

router.route("/").post(authUser, commentController.createComment)

router
  .route("/:id")
  .patch(authUser, commentController.updateComment)
  .delete(authUser, commentController.deleteComment)

module.exports = router
