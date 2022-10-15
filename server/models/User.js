const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 200,
    },
    pets: {
      type: Array,
      default: [],
    },
    profilePicture: {
      type: String,
      default:
        "https://petsgram-app.s3.us-west-1.amazonaws.com/default-profile-picture.jpg",
    },
    coverPhoto: {
      type: String,
      default:
        "https://petsgram-app.s3.us-west-1.amazonaws.com/cover-photo.jpg",
    },
    notifications: {
      type: Array,
      default: [
        {
          desc: "Welcome to Petsgram! you can now share, comment, post, like and follow!",
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
