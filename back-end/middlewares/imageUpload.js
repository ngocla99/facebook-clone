const fs = require("fs");

exports.imageUpload = async (req, res, next) => {
  try {
    const files = Object.values(req.files).flat();
    if (!req.files || files.length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }
    files.forEach((file) => {
      if (
        ![
          "image/jpg",
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ].includes(file.mimetype)
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "Unsupported format." });
      }

      if (file.size > 1024 * 1024 * 5) {
        removeTmp(file.tempFilePath);
        return res.json({ message: "File size is too large." });
      }
    });

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
