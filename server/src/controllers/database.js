import Statement from "../models/Statement.js";
import User from "../models/User.js";
import { logError } from "../util/logging.js";

export const countStatements = async (req, res) => {
  try {
    const total = await Statement.countDocuments({});
    const totalUsers = await User.countDocuments({});

    const result = {
      type: "database",
      numOfTotalStatements: total,
      numOfTotalUsers: totalUsers,
    };

    res.status(200).json({ success: true, result: result });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get values, try again later" });
  }
};
