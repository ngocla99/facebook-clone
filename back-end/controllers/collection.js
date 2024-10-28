const Post = require("../models/Post");
const Collection = require("../models/Collection");
const User = require("../models/User");
const { ObjectId } = require("mongodb");

exports.getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ user: req.user._id }).populate(
      "posts.post",
    );

    return res.json(collections);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createCollection = async (req, res) => {
  try {
    const { name } = req.body;
    const collection = new Collection({
      name,
      user: req.user._id,
    });
    await collection.save();

    req.user.collections = [...req.user.collections, collection._id];
    await req.user.save();

    return res.json({ collection });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateCollection = async (req, res) => {
  try {
    const { name, collectionId } = req.body;

    const collection = await Collection.findById(collectionId);

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    collection.name = name;
    await collection.save();

    res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteCollection = async (req, res) => {
  try {
    await Collection.findByIdAndDelete(req.params.id);

    req.user.collections = (req.user.collections ?? []).filter(
      (itm) => itm.toString() !== req.params.id,
    );

    await req.user.save();

    res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.unSavePostInCollection = async (req, res) => {
  try {
    const { postId, collectionId } = req.body;

    await Collection.findByIdAndUpdate(collectionId, {
      $pull: { posts: { post: ObjectId.createFromHexString(postId) } },
    });

    res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.savePostInCollection = async (req, res) => {
  try {
    const { postId, collectionName } = req.body;

    let collection = await Collection.findOne({
      name: collectionName,
      user: req.user._id,
    });

    if (!collection) {
      await Collection.create({
        name: collectionName,
        user: req.user._id,
        posts: [{ post: ObjectId.createFromHexString(postId) }],
      });

      return res.json({ message: "ok" });
    }

    if (collection.posts.some((itm) => itm.post.toString() === postId)) {
      return res.status(404).json({ message: "Post is already exist" });
    }

    collection.posts.push({ post: ObjectId.createFromHexString(postId) });
    await collection.save();

    res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
