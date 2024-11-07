const express = require("express")
const gifController = require("../controllers/gif")

const router = express.Router()

router.route("/").get(gifController.getGIFs)

module.exports = router
