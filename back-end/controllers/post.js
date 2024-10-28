const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Collection = require("../models/Collection");
const User = require("../models/User");
const { ObjectId } = require("mongodb");

exports.getAllPost = async (req, res) => {
  const authors = [req.user._id, ...req.user.friends, ...req.user.following];

  try {
    const posts = await Post.find({
      user: { $in: authors },
    })
      .populate("user", "firstName lastName username picture gender")
      .populate({
        path: "comments",
        options: {
          sort: { createdAt: 1 },
        },
        populate: {
          path: "commentBy",
          model: "User",
          select: "firstName lastName picture",
        },
      })
      .sort([["createdAt", -1]]);

    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "firstName lastName username picture gender")
      .populate({
        path: "comments",
        options: {
          sort: { createdAt: 1 },
        },
        populate: {
          path: "commentBy",
          model: "User",
          select: "firstName lastName picture",
        },
      });

    return res.json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = new Post({ ...req.body, user: req.user.id });
    await post.save();
    return res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id, ...updatedData } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true },
    );

    if (!updatedPost) {
      return res.status(400).json({ message: "Post not found." });
    }

    return res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post?.comments?.length > 0) {
      Comment.deleteMany({
        _id: { $in: post?.comments },
      })
        .then((result) => {
          console.log(`Deleted ${result.deletedCount} comments`);
        })
        .catch((error) => {
          console.error("Error deleting comments:", error);
        });
    }
    // TODO: Delete reactions

    return res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.savePost = async (req, res) => {
  try {
    const { postId, collectionName } = req.body; // Removed collectionId

    // Update the collection or create a new one if it doesn't exist
    const collection = await Collection.findOneAndUpdate(
      { name: collectionName, user: req.user._id },
      { $addToSet: { posts: { post: postId } } }, // Add post to posts array if it doesn't already exist
      { new: true, upsert: true }, // Return the updated document and create if it doesn't exist
    );

    req.user.savedPosts = [
      ...(req.user.savedPosts ?? []),
      {
        post: ObjectId.createFromHexString(postId),
        collection: collection._id,
      },
    ];

    // Ensure the user's collections array is updated
    if (
      req.user.collections.findIndex(
        (itm) => itm.toString() === collection._id.toString(),
      ) === -1
    ) {
      req.user.collections = [...(req.user.collections ?? []), collection._id];
    }
    await req.user.save();

    res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.unSavePost = async (req, res) => {
  try {
    const { postId } = req.body;

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { savedPosts: { post: ObjectId.createFromHexString(postId) } },
    });

    await Collection.findOneAndUpdate(
      {
        user: req.user._id,
        "posts.post": ObjectId.createFromHexString(postId),
      },
      {
        $pull: { posts: { post: ObjectId.createFromHexString(postId) } },
      },
    );

    res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getSavedPosts = async (req, res) => {
  try {
    const { savedPosts } = await User.findById(req.user._id)
      .populate({
        path: "savedPosts.post",
        populate: {
          path: "user",
          select: "firstName lastName username picture",
        },
      })
      .populate("savedPosts.collection");

    res.json({ savedPosts });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
