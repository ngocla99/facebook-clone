const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    commentBy: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: ObjectId,
      required: true,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
