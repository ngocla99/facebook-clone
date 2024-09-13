const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { removeTmp } = require("../middlewares/imageUpload");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploadImages = async (req, res) => {
  try {
    const { path } = req.body;
    const files = Object.values(req.files).flat();
    const images = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      images.push(url);
      removeTmp(file.tempFilePath);
    }
    return res.json(images);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.tempFilePath, { folder: path }, (err, res) => {
      if (err) {
        removeTmp(file.tempFilePath);
        return reject({ message: "Upload image failed." });
      }
      resolve({
        url: res.secure_url,
        width: res.width,
        height: res.height,
      });
    });
  });
};

exports.getImages = async (req, res) => {
  try {
    const { path, sort, max, nextCursor } = req.body;
    cloudinary.search
      .expression(path)
      .sort_by("created_at", sort)
      .max_results(max)
      .next_cursor(nextCursor)
      .execute()
      .then((result) => res.json(result))
      .catch((err) => console.log(err.error.message));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getImageInfo = async (req, res) => {
  try {
    const { url } = req.body;

    cloudinary.uploader.explicit(url, { type: "fetch" }, function (error, result) {
      if (error) {
        throw error;
      } else {
        return res.json({ width: result.width, height: result.height });
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
