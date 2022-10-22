import Statement from "../models/Statement.js";
import Comment from "../models/Comment.js";
import { logError } from "../util/logging.js";
import ExpiredStatement from "../models/ExpiredStatement.js";
import ExpiredComment from "../models/ExpiredComment.js";
import { updateSymScore } from "./user.js";

export const cleanUpData = async (res) => {
  try {
    const olderStatements = await Statement.find({
      dateCreated: { $lte: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    });
    olderStatements?.map(async (statement) => {
      statement.expired = true;
      await statement.save();
    });
    const expiredStatements = await Statement.find({ expired: true });
    let exp;
    let auth;
    expiredStatements?.map(async (statement) => {
      exp = statement.taggersID.length;
      auth = statement.userID;
      await updateSymScore({}, "expired", exp, auth);
      await new ExpiredStatement({
        userID: statement.userID,
        taggersID: statement.taggersID,
        netTags: statement.netTags,
        fullStatement: statement.fullStatement,
        statementStart: statement.statementStart,
        statementEnd: statement.statementStart,
        dateCreated: statement.dateCreated,
        upVotes: statement.upVotes,
        netVotes: statement.netVotes,
        downVotes: statement.downVotes,
        expired: statement.expired,
      }).save();

      const statementComments = await Comment.find({
        statementID: statement._id,
      });
      statementComments?.map(async (comment) => {
        await new ExpiredComment({
          userID: comment.userID,
          authorID: comment.authorID,
          statementID: comment.statementID,
          statementStart: comment.statementStart,
          statementEnd: comment.statementEnd,
          upVotes: comment.upVotes,
          netVotes: comment.netVotes,
          downVotes: comment.downVotes,
        }).save();
        await Comment.deleteMany({ statementID: statement._id });
      });

      await statement.deleteOne();
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      message: "Unable to clean up the database",
    });
  }
};
