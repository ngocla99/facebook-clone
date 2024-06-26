// TODO: Need to valalidate in backend
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const codeSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Code", codeSchema);
