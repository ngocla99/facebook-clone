const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const post = new Post({ ...req.body, user: req.user.id });
    await post.save();
    return res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "first_name last_name username picture gender")
      .sort([["createdAt", -1]]);
    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
