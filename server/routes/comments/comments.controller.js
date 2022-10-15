const router = require("express").Router();
const Comment = require("../../models/Comment");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");
const hasProperties = require("../../errors/hasProperties");
const Post = require("../../models/Post");
const User = require("../../models/User");

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
    res.locals.post = post;
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
  const post = res.locals.post;
  const commenter = await User.findById(req.body.data.userId);
  const poster = await User.findById(post.userId);
  console.log({ commenter, poster });
  try {
    const savedComment = await newComment.save();

    //send notification
    if (commenter.username !== poster.username) {
      await poster.updateOne({
        $push: {
          notifications: {
            desc: `${commenter.username} commented on your post`,
            postId: post._id.toString(),
          },
        },
      });
    }

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
