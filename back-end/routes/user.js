const express = require("express");
const userController = require("../controllers/user");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/activate", authUser, userController.activateAccount);
router.post("/sendVerification", authUser, userController.sendVerification);
router.post("/findUser", userController.findUser);
router.post("/sendResetPasswordCode", userController.sendResetPasswordCode);
router.post("/validateResetCode", userController.validateResetCode);
router.post("/changePassword", userController.changePassword);
router.get("/getProfile/:username", authUser, userController.getProfile);
router.get("/getMe", authUser, userController.getMe);
router.get("/getFriendsPageInfo", authUser, userController.getFriendsPageInfo);
router.get("/getOthers", authUser, userController.getOthers);
router.patch("/updateProfile", authUser, userController.updateProfile);
router.patch("/sendFriendRequest", authUser, userController.sendFriendRequest);
router.patch(
  "/cancelFriendRequest",
  authUser,
  userController.cancelFriendRequest
);
router.patch(
  "/acceptFriendRequest",
  authUser,
  userController.acceptFriendRequest
);
router.patch(
  "/removeFriendRequest",
  authUser,
  userController.removeFriendRequest
);
router.patch("/unfriend", authUser, userController.unfriend);
router.patch("/follow", authUser, userController.follow);
router.patch("/unfollow", authUser, userController.unfollow);
router.patch("/savePost", authUser, userController.savePost);

module.exports = router;
