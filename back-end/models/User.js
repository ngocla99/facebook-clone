const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const imageSchema = new mongoose.Schema({
  height: Number,
  url: {
    type: String,
    trim: true,
  },
  width: Number,
});

const workplaceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "first name is required"],
    trim: true,
    text: true,
  },
  position: String,
  city: String,
  startDate: {
    year: String,
    month: String,
    day: String,
  },
  endDate: {
    year: String,
    month: String,
    day: String,
  },
  description: String,
  isCurrent: Boolean,
  privacy: {
    type: String,
    enum: ["SELF", "EVERYONE", "FRIENDS"],
  },
});

const highSchoolSchema = new mongoose.Schema({
  school: String,
  startDate: Date,
  endDate: Date,
  description: String,
});

const collegeSchema = new mongoose.Schema({
  school: String,
  degree: String,
  fieldOfStudy: String,
  startDate: Date,
  endDate: Date,
  description: String,
});

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      text: true,
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
    picture: {
      type: String,
      trim: true,
      default: "https://github.com/shadcn.png",
    },
    coverPhoto: {
      focus: {
        x: Number,
        y: Number,
      },
      photo: {
        croppedImage: imageSchema,
        image: imageSchema,
      },
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"],
      required: [true, "gender is required"],
      trim: true,
    },
    bYear: {
      type: Number,
      require: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      require: true,
      trim: true,
    },
    bDay: {
      type: Number,
      require: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    requests: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: [workplaceSchema],
      highSchool: [highSchoolSchema],
      college: [collegeSchema],
      currentCity: {
        name: String,
        privacy: {
          type: String,
          enum: ["SELF", "EVERYONE", "FRIENDS"],
        },
      },
      city: {
        name: String,
        privacy: {
          type: String,
          enum: ["SELF", "EVERYONE", "FRIENDS"],
        },
      },
      hometown: {
        name: String,
        privacy: {
          type: String,
          enum: ["SELF", "EVERYONE", "FRIENDS"],
        },
      },
      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },
      instagram: String,
      displayOrder: [String],
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
