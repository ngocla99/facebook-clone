const { sendVerificationEmail } = require("../helpers/mailer");
const { generateToken } = require("../helpers/tokens");
const { validateEmail, validateLength, validateUsername } = require("../helpers/validation");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, username, email, password, bYear, bMonth, bDay, gender } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }

    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
      return res.status(400).json({
        message: "this email address already exists, try with a different email address",
      });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "first name must be between 3 and 30 characters",
      });
    }

    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "first name must be between 3 and 30 characters",
      });
    }
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "password must be at least 6 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    const user = new User({
      first_name,
      last_name,
      username: newUsername,
      email,
      password: hashedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    });

    await user.save();
    const emailVerificationToken = generateToken({ id: user._id.toString() }, "30m");
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success! Please activate your email to start",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;

    const userData = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(userData.id);
    if (user.verified === true) {
      return res.status(400).json({ message: "this email is already in activated" });
    } else {
      user.verified = true;
      await user.save();
      return res.status(200).json({ message: "account has been activated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "the email address you entered is not connected to an account" });
    }

    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      return res.status(400).json({ message: "Invalid credentials. Please try again." });
    }

    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
