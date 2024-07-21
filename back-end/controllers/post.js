const Post = require("../models/Post");
const { ObjectId } = require("mongodb");

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
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
