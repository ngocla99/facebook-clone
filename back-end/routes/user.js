const express = require("express")
const userController = require("../controllers/user")
const { authUser } = require("../middlewares/auth")

const router = express.Router()

// Profile-related routes
router.get("/profile/me", authUser, userController.getMe)
router.get("/profile/:username", authUser, userController.getProfile)
router.patch("/profile/update", authUser, userController.updateProfile)

// Friend-related routes
router.get("/friends/info", authUser, userController.getFriendsPageInfo)
router.patch("/friends/sendRequest", authUser, userController.sendFriendRequest)
router.patch(
  "/friends/cancelRequest",
  authUser,
  userController.cancelFriendRequest
)
router.patch(
  "/friends/acceptRequest",
  authUser,
  userController.acceptFriendRequest
)
router.patch(
  "/friends/removeRequest",
  authUser,
  userController.removeFriendRequest
)
router.patch("/friends/unfriend", authUser, userController.unfriend)

// Follow-related routes
router.patch("/follow", authUser, userController.follow)
router.patch("/unfollow", authUser, userController.unfollow)

// Other routes
router.get("/others", authUser, userController.getOthers)

module.exports = router
