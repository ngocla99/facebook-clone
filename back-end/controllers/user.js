const { sendVerificationEmail, sendResetCode } = require("../helpers/mailer");
const { generateToken } = require("../helpers/tokens");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateCode } = require("../helpers/generateCode");
const Code = require("../models/Code");
const userService = require("../services/user");
const { ObjectId } = require("mongodb");
const Collection = require("../models/Collection");
const Post = require("../models/Post");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }

    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
      return res.status(400).json({
        message:
          "This email address already exists. Try with a different email address",
      });
    }

    if (!validateLength(firstName, 3, 30)) {
      return res.status(400).json({
        message: "first name must be between 3 and 30 characters",
      });
    }

    if (!validateLength(lastName, 3, 30)) {
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

    const tempUsername = firstName + lastName;
    let newUsername = await validateUsername(tempUsername);

    const user = new User({
      firstName,
      lastName,
      username: newUsername,
      email,
      password: hashedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    });

    await user.save();
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.firstName, url);
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      firstName: user.firstName,
      lastName: user.lastName,
      token: token,
      verified: user.verified,
      message: "Register Success! Please activate your email to start.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;

    const userData = jwt.verify(token, process.env.TOKEN_SECRET);

    if (req.user.id !== userData.id) {
      return res.status(400).json({
        message: "You don't have the authorization to complete thie operation.",
      });
    }

    const user = await User.findById(userData.id);
    if (user.verified === true) {
      return res
        .status(400)
        .json({ message: "this email is already in activated" });
    } else {
      user.verified = true;
      await user.save();
      return res
        .status(200)
        .json({ message: "account has been activated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message:
          "The email address you entered is not connected to an account.",
      });
    }

    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Please try again." });
    }

    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      firstName: user.firstName,
      lastName: user.lastName,
      token: token,
      verified: user.verified,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendVerification = (req, res) => {
  try {
    const id = req.user.id;
    const user = User.findById(id);
    if (user.verified) {
      return res
        .status(400)
        .json({ message: "This account is already activated." });
    }

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.firstName, url);

    return res.json({
      message: "Email verification link has been sent to your email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User account not found", code: "USER_NOT_FOUND" });
    }

    return res.json({
      email: user.email,
      picture: user.picture,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    await Code.findOneAndDelete({ user: user._id });

    const code = generateCode(6);
    const savedCode = new Code({ code, user: user._id });
    savedCode.save();
    sendResetCode(user.email, user.firstName, code);

    return res.json({
      message: "Email reset code has been sent to your email",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.validateResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    const codeStored = await Code.findOne({ user: user._id });

    if (codeStored.code !== code) {
      return res.status(400).json({
        message:
          "The number that you've entered doesn't match your code. Please try again.",
      });
    }

    return res.json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Please enter your email" });
    }

    const cryptPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate({ email }, { password: cryptPassword });

    return res.status(200).json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await userService.getProfile({ username, user: req.user });

    if (profile._id.toString() === req.user._id.toString()) {
      return res.json({ ...profile, isVisitor: false });
    }
    const friendship = {
      friends:
        req.user.friends.includes(profile._id) &&
        profile.friends.some(
          (itm) => itm._id.toString() === req.user._id.toString()
        ),
      following: req.user.following.includes(profile._id),
      requestSent: profile.requests.some(
        (itm) => itm._id.toString() === req.user._id.toString()
      ),
      requestReceived: req.user.requests.includes(profile._id),
    };

    res.json({ ...profile, friendship, isVisitor: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    res.json({ ...req.user.toObject() });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...req.body,
      },
      { new: true }
    );
    res.json({ message: "ok", profile });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.sendFriendRequest = async (req, res) => {
  const senderId = req.user._id;
  const { userId: recipientId } = req.body;

  try {
    if (senderId.toString() === recipientId) {
      return res.status(400).json({
        message: "You can't send the friend request to yourself.",
      });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        message: "Recipient not found.",
      });
    }

    if (recipient.requests.includes(senderId)) {
      return res.status(400).json({
        message: "Friend requests is already sent.",
      });
    }

    if (recipient.friends.includes(senderId)) {
      return res.status(400).json({
        message: "You are already friends.",
      });
    }

    await req.user.updateOne({ $addToSet: { following: recipient._id } });

    await recipient.updateOne({
      $addToSet: { followers: senderId, requests: senderId },
    });

    res.json({ message: "Friend request sent successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.cancelFriendRequest = async (req, res) => {
  const senderId = req.user._id;
  const { userId: recipientId } = req.body;

  try {
    if (senderId.toString() === recipientId) {
      return res.status(400).json({
        message: "You can't cancel the friend request to yourself.",
      });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        message: "Recipient not found.",
      });
    }

    if (!recipient.requests.includes(senderId)) {
      return res.status(400).json({
        message: "Friend request not found.",
      });
    }

    await req.user.updateOne({ $pull: { following: recipient._id } });

    await recipient.updateOne({
      $pull: { followers: senderId, requests: senderId },
    });

    res.json({ message: "Friend request canceled successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  const recipientId = req.user._id;
  const { userId: senderId } = req.body;

  try {
    if (recipientId.toString() === senderId) {
      return res.status(400).json({
        message: "You can't accept the friend request to yourself.",
      });
    }

    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({
        message: "Sender not found.",
      });
    }

    if (!req.user.requests.includes(senderId)) {
      return res.status(400).json({
        message: "Friend request not found.",
      });
    }

    await req.user.updateOne({
      $pull: { requests: sender._id },
      $addToSet: { friends: sender._id, following: sender._id },
    });

    await sender.updateOne({
      $addToSet: { friends: recipientId, followers: recipientId },
    });

    res.json({ message: "Friend request accepted successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.removeFriendRequest = async (req, res) => {
  const recipientId = req.user._id;
  const { userId: senderId } = req.body;

  try {
    if (recipientId.toString() === senderId) {
      return res.status(400).json({
        message: "You can't remove the friend request to yourself.",
      });
    }

    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({
        message: "Sender not found.",
      });
    }

    if (!req.user.requests.includes(senderId)) {
      return res.status(400).json({
        message: "Friend request not found.",
      });
    }

    await req.user.updateOne({
      $pull: { requests: sender._id },
    });

    res.json({ message: "Friend request removed successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.unfriend = async (req, res) => {
  const recipientId = req.user._id;
  const { userId: senderId } = req.body;

  try {
    if (recipientId.toString() === senderId) {
      return res.status(400).json({
        message: "You can't unfriend yourself.",
      });
    }

    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({
        message: "Sender not found.",
      });
    }

    if (!req.user.friends.includes(senderId)) {
      return res.status(400).json({
        message: "You are not friends.",
      });
    }

    await req.user.updateOne({
      $pull: {
        friends: sender._id,
        following: sender._id,
      },
    });

    await sender.updateOne({
      $pull: {
        friends: recipientId,
        followers: recipientId,
      },
    });

    res.json({ message: "Unfriend successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.follow = async (req, res) => {
  const senderId = req.user._id;
  const { userId: recipientId } = req.body;

  try {
    if (senderId.toString() === recipientId) {
      return res.status(400).json({
        message: "You can't follow to yourself.",
      });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        message: "Recipient not found.",
      });
    }

    if (req.user.following.includes(recipientId)) {
      return res.status(400).json({
        message: "Friend is already followed.",
      });
    }

    await req.user.updateOne({ $addToSet: { following: recipient._id } });
    await recipient.updateOne({ $addToSet: { followers: senderId } });

    res.json({ message: "Follow successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.unfollow = async (req, res) => {
  const senderId = req.user._id;
  const { userId: recipientId } = req.body;

  try {
    if (senderId.toString() === recipientId) {
      return res.status(400).json({
        message: "You can't unfollow to yourself.",
      });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        message: "Recipient not found.",
      });
    }

    if (!req.user.following.includes(recipientId)) {
      return res.status(400).json({
        message: "You are not following.",
      });
    }

    await req.user.updateOne({ $pull: { following: recipient._id } });
    await recipient.updateOne({ $pull: { followers: senderId } });

    res.json({ message: "Unfollow successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getFriendsPageInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("friends", "firstName lastName username picture")
      .populate("requests", "firstName lastName username picture");

    const receivers = await User.find({ requests: req.user._id }).select(
      "firstName lastName username picture"
    );

    res.json({
      friends: user.friends,
      requests: user.requests,
      sentRequests: receivers,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getOthers = async (req, res) => {
  try {
    const { requests, following, followers, friends, _id } = req.user;

    const excludedIds = [
      ...requests,
      ...following,
      ...followers,
      ...friends,
      _id,
    ];

    const others = await User.find({
      _id: { $nin: excludedIds },
    }).select("firstName lastName username picture");

    res.json({ others });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.savePost = async (req, res) => {
  try {
    const { postId, collectionId, collectionName } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (
      (req.user.savedPosts ?? []).some((itm) => itm.post.toString() === postId)
    ) {
      return res.status(404).json({ message: "Post is already saved" });
    }

    req.user.savedPosts = [
      ...(req.user.savedPosts ?? []),
      { post: mongoose.Types.ObjectId(postId) },
    ];

    if (collectionId) {
      const collection = await Collection.findById(collectionId);

      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }

      if (
        req.user.collections.findIndex(
          (itm) => itm.toString() === collectionId
        ) === -1
      ) {
        req.user.collections = [
          ...(req.user.collections ?? []),
          mongoose.Types.ObjectId(collectionId),
        ];
      }

      await req.user.save();

      if (
        collection.posts.findIndex((itm) => itm.post.toString() === postId) ===
        -1
      ) {
        collection.posts = [...collection.posts, { post: postId }];
        await collection.save();
      }
    } else {
      const collection = new Collection({
        name: collectionName,
        posts: [{ post: postId }],
        user: req.user._id,
      });
      await collection.save();

      req.user.collections = [...(req.user.collections ?? []), collection._id];
      await req.user.save();
    }

    res.json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
