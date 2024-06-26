const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const CommentSchema = mongoose.Schema({
  comment: {
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
  commentAt: {
    type: Date,
    default: new Date(),
  },
});

const postSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["profilePicture", "cover", null],
      default: null,
    },
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    background: {
      type: String,
    },
    user: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
