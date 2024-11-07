const express = require("express")
const collectionController = require("../controllers/collection")
const { authUser } = require("../middlewares/auth")
const { validateUnSavedPost } = require("../middlewares/validatePost")

const router = express.Router()

router
  .route("/")
  .get(authUser, collectionController.getCollections)
  .post(authUser, collectionController.createCollection)

router
  .route("/:id")
  .patch(authUser, collectionController.updateCollection)
  .delete(authUser, collectionController.deleteCollection)

router.patch(
  "/unSavePost",
  authUser,
  validateUnSavedPost,
  collectionController.unSavePostInCollection
)
router.patch(
  "/savePost",
  authUser,
  validateUnSavedPost,
  collectionController.savePostInCollection
)

module.exports = router
