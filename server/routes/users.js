const router = require("express").Router();
const { resetWatchers } = require("nodemon/lib/monitor/watch");
const User = require("../models/User");
const bcrypt = require("bcrypt");


//ADD: change follow/unfollow to be one thing that just does the opposite

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("you cannot make changes to this account");
  }
});

//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {

    //check that its not the same user
  if (req.body.userId === req.params.id) {
    res.status(403).json("you can't follow your account");
  }
  // find the current user and the followed user
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    // check that they're not already followed
    if (!user.followers.includes(req.body.userId)) {
        // add to followers and following
      await user.updateOne({ $push: { followers: req.body.userId } });
      await currentUser.updateOne({ $push: { following: req.params.id } });
      res.status(200).json("user followed successfully");
    } else {
      res.status(403).json("you already follow this user!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {

    //check that its not the same user
  if (req.body.userId === req.params.id) {
    res.status(403).json("you can't unfollow your account");
  }
  // find the current user and the followed user
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    // check that they're not already followed
    if (user.followers.includes(req.body.userId)) {
        // add to followers and following
      await user.updateOne({ $pull: { followers: req.body.userId } });
      await currentUser.updateOne({ $pull: { following: req.params.id } });
      res.status(200).json("user unfollowed successfully");
    } else {
      res.status(403).json("you don't follow this user!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("you cannot make changes to this account");
  }
});

module.exports = router;
