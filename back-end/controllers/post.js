const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    return res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
