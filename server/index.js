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

app.use("/images", express.static(path.join(__dirname, "public/images")));
//////

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

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    const url = req.file.location;
    return res.status(200).json(url);
  } catch (error) {
    console.log(error);
  }
});

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

app.listen(process.env.PORT || 8800, () => {
  console.log("server is running!!");
});
