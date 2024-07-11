const jwt = require("jsonwebtoken");
require('dotenv').config()

exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expired,
  });
};
