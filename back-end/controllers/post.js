const Post = require("../models/Post");
const { ObjectId } = require("mongodb");

exports.createPost = async (req, res) => {
  try {
    const post = new Post({ ...req.body, user: req.user.id });
    await post.save();
    return res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "first_name last_name username picture gender")
      .populate({
        path: "comments",
        options: {
          sort: { updatedAt: -1 },
        },
        populate: {
          path: "commentBy",
          model: "User",
          select: "first_name last_name picture",
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
      .populate("user", "first_name last_name username picture gender")
      .populate({
        path: "comments",
        options: {
          sort: { updatedAt: -1 },
        },
        populate: {
          path: "commentBy",
          model: "User",
          select: "first_name last_name picture",
        },
      })
      .sort([["createdAt", -1]]);

    return res.json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
