import Comment, { validateComment } from "../models/Comment.js";
import Statement from "../models/Statement.js";
import { logError } from "../util/logging.js";
import { updateSymScore } from "./user.js";

export const getAllComments = async (req, res) => {
  const { id } = req.params;
  try {
    const count = await Comment.countDocuments({ statementID: id });
    if (count === 0) {
      return res.status(404).json({
        success: false,
        message: "There are no results!",
      });
    }

    const comments = await Comment.find({ statementID: id }).sort({
      netVotes: -1,
    });

    res.status(200).json({
      success: true,
      result: { comments },
      message: "These are all the comments",
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      message: "Unable to get comments, try again later",
    });
  }
};

export const createComment = async (req, res) => {
  const comment = { ...req.body.comment };
  try {
    if (typeof comment !== "object") {
      res.status(400).json({
        success: false,
        message: `You need to provide a 'comment' object. Received: ${JSON.stringify(
          comment
        )}`,
      });
    }
    const statement = await Statement.findOne({ _id: comment.statementID });
    if (!statement) {
      res.status(404).json({
        success: false,
        message: "The statement could not be found at this time",
      });
    }
    if (!statement.taggersID.includes(comment.userID)) {
      statement.taggersID = [...statement.taggersID, comment.userID];
    }

    const { error } = validateComment(comment);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    await new Comment({
      ...comment,
      upVotes: [comment.userID],
      netVotes: 1,
    }).save();

    if (statement.userID !== comment.userID) {
      await updateSymScore(req, "comment");
    }

    const newNetTags = await Comment.countDocuments({
      statementID: statement._id,
    });
    statement.netTags = newNetTags;

    await statement.save();

    res.status(201).send({
      message: "Statement created successfully",
      success: true,
      result: {
        comment,
        taggersID: statement.taggersID,
        netTags: statement.netTags,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "internal server error while creating statement" });
  }
};
