const Reaction = require("../models/Reaction");
const { ObjectId } = require("mongodb");

exports.getReactions = async ({ postId, userId }) => {
  const result = await Reaction.aggregate([
    { $match: { post: ObjectId.createFromHexString(postId) } },
    {
      $lookup: {
        from: "users",
        localField: "reactBy",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails",
    },
    {
      $group: {
        _id: "$reactType",
        reactions: {
          $push: {
            userId: "$reactBy",
            firstName: "$userDetails.firstName",
            lastName: "$userDetails.lastName",
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$count" },
        reactionsByType: {
          $push: {
            reactType: "$_id",
            count: "$count",
            reactions: "$reactions",
          },
        },
      },
    },
    {
      $addFields: {
        reactionsByType: {
          $sortArray: {
            input: "$reactionsByType",
            sortBy: { count: -1 },
          },
        },
      },
    },
    {
      $addFields: {
        ownReaction: {
          $arrayElemAt: [
            {
              $filter: {
                input: {
                  $reduce: {
                    input: "$reactionsByType.reactions",
                    initialValue: [],
                    in: { $concatArrays: ["$$value", "$$this"] },
                  },
                },
                as: "reaction",
                cond: { $eq: ["$$reaction.userId", ObjectId.createFromHexString(userId)] },
              },
            },
            0,
          ],
        },
      },
    },
    {
      $addFields: {
        ownReactionType: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$reactionsByType",
                as: "type",
                cond: {
                  $in: ["$ownReaction.userId", "$$type.reactions.userId"],
                },
              },
            },
            0,
          ],
        },
      },
    },
    {
      $project: {
        _id: 0,
        total: 1,
        reactionsByType: 1,
        ownReaction: {
          userId: "$ownReaction.userId",
          firstName: "$ownReaction.firstName",
          lastName: "$ownReaction.lastName",
          reactType: "$ownReactionType.reactType",
        },
      },
    },
  ]);

  if (result.length === 0) {
    return {
      total: 0,
      reactionsByType: [],
      ownReaction: null,
    };
  }

  return result[0];
};
