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
router.get("/getProfile/:username", userController.getProfile);
router.get("/getMe", authUser, userController.getMe);
router.get("/updateProfile", authUser, userController.getMe);
router.put("/updateProfile", authUser, userController.updateProfile);

module.exports = router;
