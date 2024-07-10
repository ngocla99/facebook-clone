const express = require("express");
const gifController = require("../controllers/gif");

const router = express.Router();

router.get("/gifs", gifController.getGIFs);

module.exports = router;
