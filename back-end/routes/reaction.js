const express = require("express");
const reactionController = require("../controllers/reaction");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/reactPost", authUser, reactionController.reactPost);
router.get("/getReactions/:postId", authUser, reactionController.getReactions);

module.exports = router;
