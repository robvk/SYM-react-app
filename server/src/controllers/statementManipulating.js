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

    switch (newData.vote) {
      case "up":
        if (!statement.upVotes.includes(newData.userID)) {
          statement.upVotes.push(newData.userID);
        }
        if (statement.downVotes.includes(newData.userID)) {
          statement.downVotes = statement.downVotes.filter(
            (user) => user !== newData.userID
          );
        }
        break;
      case "neutral":
        if (statement.downVotes.includes(newData.userID)) {
          statement.downVotes = statement.downVotes.filter(
            (user) => user !== newData.userID
          );
        }
        if (statement.upVotes.includes(newData.userID)) {
          statement.upVotes = statement.upVotes.filter(
            (user) => user !== newData.userID
          );
        }
        break;
      case "down":
        if (!statement.downVotes.includes(newData.userID)) {
          statement.downVotes.push(newData.userID);
        }
        if (statement.upVotes.includes(newData.userID)) {
          statement.upVotes = statement.upVotes.filter(
            (user) => user !== newData.userID
          );
        }
        break;
      default:
        statement.upVotes;
        statement.downVotes;
    }
    statement.netVotes = statement.upVotes.length - statement.downVotes.length;
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
      expired: statement.expired,
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
      expired: false,
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
