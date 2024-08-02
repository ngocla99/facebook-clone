const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["PROFILE_PICTURE", "COVER_PHOTO", null],
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
    audience: {
      type: String,
      enum: ["SELF", "EVERYONE", "FRIENDS"],
    },
    user: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    comments: [{ type: ObjectId, required: true, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
