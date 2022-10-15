const router = require("express").Router();
const Comment = require("../../models/Comment");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");
const hasProperties = require("../../errors/hasProperties");
const Post = require("../../models/Post");

//ADD: error handling

async function postExists(req, res, next) {
  postId = req.params.postId ? req.params.postId : req.body.data.postId;

  if (!postId) {
    next({
      message: `please add a postId to this request`,
      status: 400,
    });
  }
  const post = await Post.findById(postId);
  if (!post) {
    next({
      message: `this userId (${postId}) is does not exist`,
      status: 404,
    });
  } else {
    next();
  }
}

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
  const newComment = new Comment(req.body.data);
  console.log(req.body.data);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  list: [postExists, asyncErrorBoundary(list)],
  create: [
    hasProperties("desc", "userId", "postId"),
    postExists,
    asyncErrorBoundary(create),
  ],
};
