const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const CommentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    max: 500,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
