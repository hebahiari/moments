//libraries
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");
const shortId = require("shortid");
const { S3Client } = require("@aws-sdk/client-s3");
const cors = require("cors");
//routers
const usersRouter = require("./routes/users/users.router");
const authRouter = require("./routes/auth/auth.router");
const postsRouter = require("./routes/posts/posts.router");
const commentsRouter = require("./routes/comments/comments.router");
const uploadRouter = require("./routes/upload");
//errors
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const app = express();

mongoose.connect(process.env.MONGO_URL);

app.use(cors());

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/", express.static(path.join(__dirname, "../client/build")));

// middleware
app.use(express.json());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      imgSrc: ["'self'", "https://petsgram-app.s3.us-west-1.amazonaws.com/"],
    },
  })
);
app.use(morgan("dev"));

// routing
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/upload", uploadRouter);

// errors
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 8800, () => {
  console.log("server is running!!");
});
