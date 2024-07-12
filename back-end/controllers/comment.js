const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.createComment = async (req, res) => {
  try {
    const comment = new Comment({ ...req.body, commentBy: req.user.id });
    await comment.save();

    const post = await Post.findById(req.body.post);
    post.comments = [...post.comments, comment._id];
    await post.save();

    return res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
