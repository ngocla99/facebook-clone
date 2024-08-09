const User = require("../models/User");
const { ObjectId } = require("mongodb");

exports.getProfile = async ({ username }) => {
  const result = await User.aggregate([
    { $match: { username } },
    {
      $addFields: {
        totalFriends: { $size: "$friends" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "friends",
        foreignField: "_id",
        as: "friends",
        pipeline: [
          {
            $project: {
              firstName: 1,
              lastName: 1,
              username: 1,
              picture: 1,
            },
          },
          {
            $limit: 9,
          },
        ],
      },
    },
  ]);

  return result[0];
};
