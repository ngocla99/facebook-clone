const Post = require("../models/Post");

exports.validateUnSavedPost = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (
      !(req.user.savedPosts ?? []).some((itm) => itm.post.toString() === postId)
    ) {
      return res.status(404).json({ message: "Post not found" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.validateSavedPost = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (
      (req.user.savedPosts ?? []).some((itm) => itm.post.toString() === postId)
    ) {
      return res.status(404).json({ message: "Post is already saved" });
    }

    next();
  } catch (error) {
    next(error);
  }
};
