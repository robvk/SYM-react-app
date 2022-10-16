import Statement, { validateStatement } from "../models/Statement.js";
import { logError } from "../util/logging.js";
import makeFirstLetterUpper from "../util/makeFirstLetterUpper.js";
import { updateSymScore } from "./user.js";

export const updateStatement = async (req, res) => {
  const newData = req.body.statement;

  try {
    let statement = await Statement.findOne({ _id: req.params.id });
    if (!statement) {
      res.status(404).json({
        success: false,
        message: "The statement was not found",
      });
    }

    statement.userID = newData.userID ? newData.userID : statement.userID;
    statement.taggersID = newData.taggersID
      ? newData.taggersID
      : statement.taggersID;
    statement.netTags = newData.netTags ? newData.netTags : statement.netTags;
    statement.fullStatement = newData.fullStatement
      ? newData.fullStatement
      : statement.fullStatement;
    statement.statementStart = newData.statementStart
      ? newData.statementStart
      : statement.statementStart;
    statement.statementEnd = newData.statementEnd
      ? newData.statementEnd
      : statement.statementEnd;
    statement.dateCreated = newData.dateCreated
      ? newData.dateCreated
      : statement.dateCreated;
    statement.upVotes = newData.upVotes ? newData.upVotes : statement.upVotes;
    statement.netVotes = newData.netVotes
      ? newData.netVotes
      : statement.netVotes;
    statement.downVotes = newData.downVotes
      ? newData.downVotes
      : statement.downVotes;

    const statementToValidate = {
      userID: statement.userID,
      taggersID: statement.taggersID,
      netTags: statement.netTags,
      fullStatement: statement.fullStatement,
      statementStart: statement.statementStart,
      statementEnd: statement.statementEnd,
      dateCreated: statement.dateCreated,
      upVotes: statement.upVotes,
      downVotes: statement.downVotes,
      netVotes: statement.netVotes,
    };
    const { error } = validateStatement(statementToValidate);
    if (error) {
      return res.status(400).send({
        message: `${error.details[0].path} field fails to match the required pattern`,
      });
    }
    await statement.save();
    res.status(200).json({
      success: true,
      result: statement,
      message: "Statement was updated successfully",
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      message: "Unable to get the statement, try again later",
    });
  }
};

// export const acceptCancelJob = async (req, res) => {
//   try {
//     let job = await Job.findOne({ _id: req.params.id });
//     if (!job) {
//       res.status(404).json({
//         success: false,
//         message: "The job is not found",
//       });
//     }
//     if (job.delivererIDs.includes(req.body.job.delivererID)) {
//       job.delivererIDs = job.delivererIDs.filter(
//         (id) => id !== req.body.job.delivererID
//       );
//     } else {
//       job.delivererIDs.push(req.body.job.delivererID);
//     }

//     await job.save();
//     res.status(200).json({
//       success: true,
//       result: job,
//       message: "Job is updated successfully",
//     });
//   } catch (error) {
//     logError(error);
//     res.status(500).json({
//       success: false,
//       message: "Unable to get the job, try again later",
//     });
//   }
// };

export const createStatement = async (req, res) => {
  const statement = { ...req.body };
  try {
    if (typeof statement.statement !== "object") {
      res.status(400).json({
        success: false,
        message: `You need to provide a 'statement' object. Received: ${JSON.stringify(
          statement.statement
        )}`,
      });
    }
    const { error } = validateStatement(statement.statement);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    statement.statement.fullStatement = makeFirstLetterUpper(
      statement.statement.fullStatement
    );
    statement.statement.statementStart = makeFirstLetterUpper(
      statement.statement.statementStart
    );

    await new Statement({
      ...statement.statement,
      upVotes: [statement.statement.userID],
      netVotes: 1,
      netTags: 0,
    }).save();
    await updateSymScore(req, "statement");
    res
      .status(201)
      .send({ message: "Statement created successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .send({ message: "internal server error while creating statement" });
  }
};
