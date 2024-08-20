const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const collectionSchema = mongoose.Schema(
  {
    name: { type: String, unique: true },
    user: [{ type: ObjectId, required: true, ref: "User" }],
    posts: [
      {
        _id: false,
        post: { type: ObjectId, ref: "Post" },
        savedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Collection", collectionSchema);
