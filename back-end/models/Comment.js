const mongoose = require("mongoose");
const Post = require("./Post");

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

// Pre-remove hook to delete tht comment in the associated post when a comment is deleted
commentSchema.pre("deleteOne", async function (next) {
  try {
    this.r = await this.clone().findOne();
    if (!this.r) {
      throw { message: "Comment not found." };
    }

    const post = await Post.findById(this.r.post);
    post.comments = [...post.comments].filter(
      (itm) => itm.toString() !== this.r._id.toString()
    );
    await post.save();

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Comment", commentSchema);
