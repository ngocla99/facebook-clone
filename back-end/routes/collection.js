const express = require("express");
const postController = require("../controllers/post");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.get("/getCollections", authUser, postController.getAllPost);
router.post("/createCollection", authUser, postController.createPost);
router.patch("/updateCollection", authUser, postController.updatePost);
router.delete("/deleteCollection/:id", authUser, postController.deletePost);

module.exports = router;
