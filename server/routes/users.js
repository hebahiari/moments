const router = require("express").Router();
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

//get matching usernames
router.get("/search/:username", async (req, res) => {
  const searchedUsername = req.params.username;
  try {
    const foundUsers = await User.find({
      username: { $regex: searchedUsername, $options: "i" },
    });
    res.status(200).json(foundUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get the following users
router.get("/following/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const following = await Promise.all(
      user.following.map((followingId) => {
        return User.findById(followingId);
      })
    );
    let friendList = [];
    following.map((person) => {
      const { _id, username, profilePicture } = person;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get followers
router.get("/followers/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const followers = await Promise.all(
      user.followers.map((followerId) => {
        return User.findById(followerId);
      })
    );
    let friendList = [];
    followers.map((person) => {
      const { _id, username, profilePicture } = person;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
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

//change profile picture
router.put("/:id/img", async (req, res) => {
  const img = req.body.img;

  try {
    // find the current user
    const user = await User.findById(req.params.id);
    await user.updateOne({ profilePicture: img });
    res.status(200).json("picture updated!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete user  //TODO: add delele account feature?
// router.delete("/:id", async (req, res) => {
//   if (req.body.userId === req.params.id || req.body.isAdmin) {
//     try {
//       const user = await User.findByIdAndDelete(req.params.id);
//       res.status(200).json("Account has been deleted");
//     } catch (error) {
//       return res.status(500).json(error);
//     }
//   } else {
//     return res.status(403).json("you cannot make changes to this account");
//   }
// });

module.exports = router;
