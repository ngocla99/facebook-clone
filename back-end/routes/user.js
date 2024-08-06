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
router.put("/updateProfile", authUser, userController.updateProfile);
router.put("/sendFriendRequest", authUser, userController.sendFriendRequest);
router.put("/cancelFriendRequest", authUser, userController.cancelFriendRequest);
router.put("/acceptFriendRequest", authUser, userController.acceptFriendRequest);
router.put("/removeFriendRequest", authUser, userController.removeFriendRequest);
router.put("/unfriend", authUser, userController.unfriend);
router.put("/follow", authUser, userController.follow);
router.put("/unfollow", authUser, userController.unfollow);

module.exports = router;
