const router = require("express").Router();
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

//update user //TODO: add bio?
// async function update(req, res) {
//   if (req.body.userId === req.params.id) {
//     if (req.body.password) {
//       try {
//         const salt = await bcrypt.genSalt(10);
//         req.body.password = await bcrypt.hash(req.body.password, salt);
//       } catch (error) {
//         return res.status(500).json(error);
//       }
//     }
//     try {
//       const user = await User.findByIdAndUpdate(req.params.id, {
//         $set: req.body,
//       });
//       res.status(200).json("Account has been updated");
//     } catch (error) {
//       return res.status(500).json(error);
//     }
//   } else {
//     return res.status(403).json("you cannot make changes to this account");
//   }
// }

//user exists in database
async function userExists(req, res, next) {
  //TODO: add error for undefined
  let user;
  if (req.query.username) {
    user = await User.findOne({ username: req.query.username });
  } else if (req.query.userId) {
    user = await User.findById(req.query.userId);
  } else if (req.params.userId) {
    user = await User.findById(req.params.userId);
  }

  if (!user) {
    next({
      message: `user not found`,
      status: 404,
    });
  } else {
    const { password, updatedAt, ...other } = user._doc;
    res.locals.user = other;
    next();
  }
}

//get matching usernames // errors handled
async function search(req, res) {
  const searchedUsername = req.params.username;
  const foundUsers = await User.find({
    username: { $regex: searchedUsername, $options: "i" },
  });
  res.status(200).json(foundUsers);
}

//get a user //errors handled
async function read(req, res, next) {
  const user = res.locals.user;
  res.status(200).json(user);
}

// get the following users //errors handled
async function listFollowing(req, res) {
  const user = res.locals.user;

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
}

//get followers //errors handled
async function listFollowers(req, res) {
  const user = res.locals.user;
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
}

//follow a user // change it into follow/unfollow //TODO
async function updateFollow(req, res) {
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
}

//unfollow a user
// router.put("/:id/unfollow", async (req, res) => {
//   //check that its not the same user
//   if (req.body.userId === req.params.id) {
//     res.status(403).json("you can't unfollow your account");
//   }
//   // find the current user and the followed user
//   try {
//     const user = await User.findById(req.params.id);
//     const currentUser = await User.findById(req.body.userId);

//     // check that they're not already followed
//     if (user.followers.includes(req.body.userId)) {
//       // add to followers and following
//       await user.updateOne({ $pull: { followers: req.body.userId } });
//       await currentUser.updateOne({ $pull: { following: req.params.id } });
//       res.status(200).json("user unfollowed successfully");
//     } else {
//       res.status(403).json("you don't follow this user!");
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

//change profile picture //errors handled
async function updatePicture(req, res) {
  const img = req.body.data.img;
  const user = await User.findById(req.params.userId);
  await user.updateOne({ profilePicture: img });
  res.status(200).json("picture updated!");
}

//delete user
async function remove(req, res) {
  if (req.body.userId === req.params.userId) {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Account has been deleted");
  } else {
    return res.status(403).json("you cannot make changes to this account");
  }
}

module.exports = {
  delete: [asyncErrorBoundary(remove)],
  read: [userExists, asyncErrorBoundary(read)],
  updatePicture: [
    userExists,
    hasProperties("img"),
    asyncErrorBoundary(updatePicture),
  ],
  updateFollow: [asyncErrorBoundary(updateFollow)],
  listFollowers: [userExists, asyncErrorBoundary(listFollowers)],
  listFollowing: [userExists, asyncErrorBoundary(listFollowing)],
  search: [asyncErrorBoundary(search)],
  //   update: [asyncErrorBoundary(update)],
};
