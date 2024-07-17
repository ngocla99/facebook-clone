const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.createComment = async (req, res) => {
  try {
    const comment = new Comment({ ...req.body, commentBy: req.user._id });
    await comment.save();

    const post = await Post.findById(req.body.post);
    post.comments = [...post.comments, comment._id];
    await post.save();

    return res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { text, image } = req.body;
    const comment = await Comment.findById(req.body.id);

    if (!comment) {
      return res.status(400).json({ message: "Comment not found." });
    }

    if (text) comment.text = text;
    if (image) comment.image = image;

    await comment.save();

    return res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

    return res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
