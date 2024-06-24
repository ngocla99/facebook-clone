const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
  try {
    let tmp = req.header("Authorization");
    const token = tmp ? tmp.split(" ")[1] : "";
    if (!token) {
      return res.status(400).json({ message: "Invalid Authentication" });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Authentication" });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
