const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const reactionSchema = mongoose.Schema({
  reactType: {
    type: String,
    enum: ["LIKE", "LOVE", "HAHA", "SAD", "ANGRY", "WOW"],
    required: true,
  },
  post: {
    type: ObjectId,
    ref: "Post",
  },
  reactBy: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("React", reactionSchema);
