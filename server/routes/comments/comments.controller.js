const router = require("express").Router();
const Comment = require("../../models/Comment");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");
const hasProperties = require("../../errors/hasProperties");
const Post = require("../../models/Post");
const User = require("../../models/User");

//validation
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

async function isNotEmpty(req, res, next) {
  console.log("hello");
  const comment = req.body.data.desc;
  console.log({ comment });
  console.log(!/\S/.test(comment));
  if (!/\S/.test(comment)) {
    next({
      message: `comment cannot be empty`,
      status: 400,
    });
  } else {
    next();
  }
}

//requests
//get comments for a post
async function list(req, res) {
  const postId = req.params.postId;
  const comments = await Comment.find({ postId: postId });
  res.status(200).json(comments);
}

//add a comment
async function create(req, res) {
  const newComment = new Comment(req.body.data);
  const post = res.locals.post;
  const commenter = await User.findById(req.body.data.userId);
  const poster = await User.findById(post.userId);
  console.log({ commenter, poster });

  const savedComment = await newComment.save();

  //send notification
  if (commenter.username !== poster.username) {
    await poster.updateOne({
      $push: {
        notifications: {
          desc: `${commenter.username} commented on your post`,
          postId: post._id.toString(),
          opened: false,
        },
      },
    });
  }

  res.status(201).json(savedComment);
}

// delete comment
async function remove(req, res) {
  const commentId = req.params.commentId;
  console.log({ commentId });
  await Comment.findByIdAndDelete(commentId);
  res.status(204);
}

module.exports = {
  list: [postExists, asyncErrorBoundary(list)],
  create: [
    hasProperties("desc", "userId", "postId"),
    isNotEmpty,
    postExists,
    asyncErrorBoundary(create),
  ],
  delete: [remove],
};
