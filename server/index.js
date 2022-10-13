const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const shortId = require("shortid");
const cors = require("cors");
app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

//TODO: replace this section
app.use("/images", express.static(path.join(__dirname, "public/images")));
/////

/// for heroku
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../client/build")));

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});
/////

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

//TODO: replace this section && switch to S3 storage bucket

const s3 = new S3Client({
  region: "us-west-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_AWS,
    secretAccessKey: process.env.ACCESS_SECRET_AWS,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "petsgram-app",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, shortId.generate() + "-" + file.originalname);
    },
  }),
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const url = req.file.location;
    return res.status(200).json(url);
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);

app.listen(8800, () => {
  console.log("server is running!!");
});
