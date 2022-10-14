const router = require("express").Router();
const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
const User = require("../../models/User");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

async function userExists(req, res, next) {
  let user = null;
  let userId = null;
  if (req.params.userId) {
    userId = req.params.userId;
  } else if (req.body && req.body.data && req.body.data.userId) {
    userId = req.body.data.userId;
  } else {
    next({
      message: `please add a userId/username to this request`,
      status: 400,
    });
  }

  try {
    user = await User.findById(userId);
  } catch (error) {
    next({
      message: `this userId (${userId}) is not valid`,
      status: 400,
    });
  }

  if (!user) {
    next({
      message: `this userId (${userId}) does not exist`,
      status: 404,
    });
  } else {
    res.locals.user = user;
    next();
  }
}

async function postExists(req, res, next) {
  let post = null;
  const postId = req.params.postId;

  post = await Post.findById(postId);

  if (!post) {
    next({
      message: `this post (${postId}) does not exist`,
      status: 404,
    });
  } else {
    res.locals.post = post;
    next();
  }
}

async function userOwnsPost(req, res, next) {
  let post = res.locals.post;
  let user = res.locals.user;
  console.log(post.userId);
  console.log(user._id.toString());

  if (post.userId != user._id) {
    next({
      message: `you cannot make changes to this post`,
      status: 400,
    });
  } else {
    next();
  }
}

// create a post // error handling complete
async function create(req, res) {
  const newPost = new Post(req.body.data);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
}

// delete a post // error handling complete
async function remove(req, res) {
  let post = res.locals.post;
  await post.deleteOne();
  res.status(200).json("the post has been deleted");
}

//like/unlike a post // error handling complete
async function like(req, res) {
  let post = res.locals.post;
  let user = res.locals.user;
  console.log({ post });

  if (!post.likes.includes(user._id.toString())) {
    await post.updateOne({ $push: { likes: user._id.toString() } });
    res.status(200).json("post liked!");
  } else {
    await post.updateOne({ $pull: { likes: user._id.toString() } });
    res.status(200).json("post unliked!");
  }
}

// get all posts // error handling complete
async function list(req, res) {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
}

//get all posts of a user // error handling complete
async function listUserPosts(req, res) {
  const user = res.locals.user;
  const posts = await Post.find({ userId: user._id.toString() });
  res.status(200).json(posts);
}

// get all following posts // error handling complete
async function listFollowed(req, res) {
  const user = res.locals.user;
  const userPosts = await Post.find({ userId: user._id.toString() });
  const friendsPosts = await Promise.all(
    user.following.map((friendId) => {
      return Post.find({ userId: friendId });
    })
  );
  res.status(200).json(userPosts.concat(...friendsPosts));
}

//add a comment // moved to comments
// async function addComment(req, res) {
//   const newComment = new Comment(req.body.data);
//   try {
//     const savedComment = await newComment.save();
//     res.status(200).json(savedComment);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// }

//update a post //TODO: review once update post api exists
async function update(req, res) {
  const post = res.locals.post;
  await post.updateOne({ $set: req.body.data });
  res.status(200).json("the post has been updated");
}

//get a post
async function read(req, res) {
  const post = res.locals.post;
  res.status(200).json(post);
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [postExists, asyncErrorBoundary(read)],
  update: [
    userExists,
    postExists,
    userOwnsPost,
    hasProperties("desc"),
    asyncErrorBoundary(update),
  ],
  delete: [userExists, postExists, userOwnsPost, asyncErrorBoundary(remove)],
  //   addComment: asyncErrorBoundary(addComment),
  listFollowed: [userExists, asyncErrorBoundary(listFollowed)],
  listUserPosts: [userExists, asyncErrorBoundary(listUserPosts)],
  like: [userExists, postExists, asyncErrorBoundary(like)],
  create: [
    hasProperties("userId", "desc"),
    userExists,
    asyncErrorBoundary(create),
  ],
};
