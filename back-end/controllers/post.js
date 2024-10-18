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
    const updatedPost = await Post.findByIdAndUpdate(id, { $set: updatedData }, { new: true, runValidators: true });

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
    const { postId, collectionId, collectionName } = req.body;

    req.user.savedPosts = [...(req.user.savedPosts ?? []), { post: ObjectId.createFromHexString(postId) }];

    if (collectionId) {
      const collection = await Collection.findById(collectionId);

      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }

      if (req.user.collections.findIndex((itm) => itm.toString() === collectionId) === -1) {
        req.user.collections = [...(req.user.collections ?? []), ObjectId.createFromHexString(collectionId)];
      }

      await req.user.save();

      if (collection.posts.findIndex((itm) => itm.post.toString() === postId) === -1) {
        collection.posts = [...collection.posts, { post: postId }];
        await collection.save();
      }
    } else {
      const collection = new Collection({
        name: collectionName,
        posts: [{ post: postId }],
        user: req.user._id,
      });
      await collection.save();

      req.user.collections = [...(req.user.collections ?? []), collection._id];
      await req.user.save();
    }

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
      }
    );

    res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getSavedPosts = async (req, res) => {
  try {
    const { savedPosts } = await User.findById(req.user._id).populate("savedPosts.post");
    res.json({ savedPosts });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
