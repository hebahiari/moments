const router = require("express").Router();
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const shortId = require("shortid");
const multer = require("multer");
const dotenv = require("dotenv").config();

//upload an image for a post
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

router.post("/", upload.single("file"), (req, res) => {
  console.log("inside router!");
  try {
    const url = req.file.location;
    return res.status(200).json(url);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
