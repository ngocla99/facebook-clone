const express = require("express");
const uploadController = require("../controllers/upload");
const { authUser } = require("../middlewares/auth");
const { imageUpload } = require("../middlewares/imageUpload");

const router = express.Router();

router.post(
  "/uploadImages",
  authUser,
  imageUpload,
  uploadController.uploadImages
);
router.post("/getImages", uploadController.getImages);
router.post("/getImageInfo", uploadController.getImageInfo);

module.exports = router;
