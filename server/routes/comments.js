const router = require("express").Router();
const Comment = require("../models/Comment");

//ADD: error handling

//get comments for a post
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const comments = await Comment.find({ postId: postId });
    console.log(comments);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});

//add a comment
router.post("/", async (req, res) => {
  console.log("commenting ... ");
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
