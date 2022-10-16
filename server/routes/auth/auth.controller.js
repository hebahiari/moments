const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");
const hasProperties = require("../../errors/hasProperties");

//TODO: fix this
async function uniqueCredentials(req, res, next) {
  const { username, email } = req.body.data;

  const userByUsername = await User.find({ username: username });
  const userByEmail = await User.find({ email: email });

  if (userByEmail.length) {
    next({
      message: `email already exists`,
      status: 400,
    });
  } else if (userByUsername.length) {
    next({
      message: `username already exists`,
      status: 400,
    });
  } else {
    next();
  }
}

//Register
async function register(req, res) {
  try {
    // generate encypted password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.data.password, salt);

    // create a new user
    const newUser = new User({
      username: req.body.data.username,
      email: req.body.data.email,
      password: hashedPassword,
    });

    //save the new user and respond
    const user = await newUser.save();
    await User.findOneAndUpdate(
      { username: "the-heba" },
      { $push: { following: user._id.toString() } }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}

//Login
async function login(req, res) {
  try {
    // check if user exists
    const user = await User.findOne({ email: req.body.data.email });
    if (!user) {
      res.status(404).json("email not found");
    } else {
      // validate password
      const validPassword = await bcrypt.compare(
        req.body.data.password,
        user.password
      );

      const { password, followers, following, ...other } = user._doc;

      !validPassword
        ? res.status(400).json("wrong password!")
        : res.status(200).json(other);
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  login: [hasProperties("email", "password"), asyncErrorBoundary(login)],
  register: [
    hasProperties("email", "password", "username"),
    uniqueCredentials,
    asyncErrorBoundary(register),
  ],
};
