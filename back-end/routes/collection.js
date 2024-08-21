const express = require("express");
const collectionController = require("../controllers/collection");
const { authUser } = require("../middlewares/auth");
const { validateUnSavedPost } = require("../middlewares/validatePost");

const router = express.Router();

router.get("/getCollections", authUser, collectionController.getCollections);
router.post(
  "/createCollection",
  authUser,
  collectionController.createCollection
);
router.patch(
  "/updateCollection",
  authUser,
  collectionController.updateCollection
);
router.delete(
  "/deleteCollection/:id",
  authUser,
  collectionController.deleteCollection
);
router.patch(
  "/unSavePostInCollection",
  authUser,
  validateUnSavedPost,
  collectionController.unSavePostInCollection
);
router.patch(
  "/savePostInCollection",
  authUser,
  validateUnSavedPost,
  collectionController.savePostInCollection
);

module.exports = router;
