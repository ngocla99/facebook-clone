exports.imageUpload = async (req, res, next) => {
  try {
    console.log(req.files);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
