const express = require("express");
const uploadController = require("../controllers/upload");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/uploadImages", authUser, uploadController.uploadImages);

module.exports = router;
