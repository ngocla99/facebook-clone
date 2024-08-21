const Reaction = require("../models/Reaction");
const reactionService = require("../services/reaction");
const { ObjectId } = require("mongodb");

exports.reactPost = async (req, res) => {
  try {
    const { postId, reactType } = req.body;
    const existedReact = await Reaction.findOne({
      post: ObjectId.createFromHexString(postId),
      reactBy: ObjectId.createFromHexString(req.user._id),
    });

    if (existedReact) {
      if (existedReact.reactType === reactType) {
        await Reaction.findByIdAndDelete(existedReact._id);
      } else {
        existedReact.reactType = reactType;
        await existedReact.save();
      }
    } else {
      const newReact = new Reaction({
        post: ObjectId.createFromHexString(postId),
        reactBy: ObjectId.createFromHexString(req.user._id),
        reactType,
      });

      await newReact.save();
    }
    return res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getReactions = async (req, res) => {
  try {
    const result = await reactionService.getReactions({
      userId: req.user._id,
      postId: req.params.postId,
    });

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
