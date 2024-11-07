const express = require("express")
const reactionController = require("../controllers/reaction")
const { authUser } = require("../middlewares/auth")

const router = express.Router()

router.route("/").post(authUser, reactionController.reactPost)

router.route("/:postId").get(authUser, reactionController.getReactions)

module.exports = router
