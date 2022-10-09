const router = require("express").Router();
const { response } = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
//ADD: error handling

// create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId !== req.body.userId) {
      res.status(403).json("you can only make changes to your posts");
    }
    await post.updateOne({ $set: req.body });
    res.status(200).json("the post has been updated");
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId !== req.body.userId) {
      res.status(403).json("you can only make changes to your posts");
    }
    await post.deleteOne();
    res.status(200).json("the post has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//like/unlike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      console.log(req.body.userId);
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("post liked!");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("post unliked!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all posts
router.get("/timeline/all", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all posts of a user
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all following posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendsPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendsPosts));
  } catch (error) {
    res.status(500).json(error);
  }
});
//add a comment
router.put("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log({ post });
    await post.updateOne({ $push: { comments: req.body } });
    res.status(200).json("comment sent!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
