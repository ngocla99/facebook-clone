const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authUser = async (req, res, next) => {
  try {
    let tmp = req.header("Authorization");
    const token = tmp ? tmp.split(" ")[1] : "";
    if (!token) {
      return res.status(401).json({ message: "Invalid Authentication" });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, data) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Authentication" });
      }
      const user = await User.findById(data.id);
      req.user = user;

      next();
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
