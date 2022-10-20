import Statement from "../models/Statement.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import { logError } from "../util/logging.js";

const getDatabaseNumbers = async (req, res) => {
  try {
    const countTags = await Comment.countDocuments({});
    const countStatements = await Statement.countDocuments({});
    const countUsers = await User.countDocuments({});
    // const countDeleted

    res.status(200).json({
      success: true,
      result: { countTags, countStatements, countUsers },
      message: "These are all the counts",
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      message: "Unable to get comments, try again later",
    });
  }
};

export default getDatabaseNumbers;
