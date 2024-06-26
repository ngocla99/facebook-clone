exports.uploadImages = async (req, res) => {
  try {
    res.json({ message: "Uploading" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
