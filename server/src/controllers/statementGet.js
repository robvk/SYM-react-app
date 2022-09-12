import Statement from "../models/Job.js";
import { logError } from "../util/logging.js";

export const getAllStatements = async (req, res) => {
  try {
    const count = await Statement.countDocuments({});

    if (count === 0) {
      return res.status(404).json({
        success: false,
        message: "There are no results!",
      });
    }

    const statements = await Statement.find();

    res.status(200).json({
      success: true,
      result: { statements },
      message: "These are all the statements",
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      message: "Unable to get statements, try again later",
    });
  }
};

export const getOneStatement = async (req, res) => {
  const { id } = req.params;

  try {
    const statement = await Statement.findOne({ _id: id });

    res.status(200).json({
      success: true,
      result: statement,
      message: "This is the statement you asked for",
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      message: "Unable to get statement, try again later",
    });
  }
};
