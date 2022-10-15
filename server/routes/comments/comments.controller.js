const router = require("express").Router();
const Comment = require("../../models/Comment");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

//ADD: error handling

//get comments for a post
async function list(req, res) {
  const postId = req.params.postId;
  try {
    const comments = await Comment.find({ postId: postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
}

//add a comment
async function create(req, res) {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(create)],
};
