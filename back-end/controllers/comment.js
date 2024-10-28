const Comment = require("../models/Comment");
const Post = require("../models/Post");
const { ObjectId } = require("mongodb");

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
    const { id, ...updatedData } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true },
    );

    if (!updatedComment) {
      return res.status(400).json({ message: "Comment not found." });
    }

    return res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await Comment.deleteOne({
      _id: ObjectId.createFromHexString(req.params.id),
    });

    return res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
