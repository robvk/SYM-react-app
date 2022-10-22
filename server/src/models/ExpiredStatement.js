import mongoose from "mongoose";
import Joi from "joi";

const ExpiredStatementSchema = new mongoose.Schema({
  userID: { type: String },
  taggersID: [{ type: String, required: false }],
  netTags: { type: Number, required: false },
  fullStatement: { type: String, required: true },
  statementStart: { type: String, required: true },
  statementEnd: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  upVotes: [{ type: String, required: false }],
  netVotes: { type: Number, required: false },
  downVotes: [{ type: String, required: false }],
  expired: { type: Boolean, required: false },
});

const ExpiredStatement = mongoose.model(
  "expiredStatements",
  ExpiredStatementSchema
);

export const validateExpiredStatement = (data) => {
  const schema = Joi.object({
    userID: Joi.string().min(1).required().label("userID"),
    fullStatement: Joi.string().min(1).required().label("fullStatement"),
    statementStart: Joi.string().min(1).required().label("statementStart"),
    statementEnd: Joi.string().min(1).required().label("statementEnd"),
    dateCreated: Joi.date().required().label("dateCreated"),
    upVotes: Joi.array().label("upVotes"),
    netVotes: Joi.number().label("upVotesCount"),
    downVotes: Joi.array().label("downVotes"),
    taggersID: Joi.array().label("taggersID"),
    netTags: Joi.number().label("netTags"),
    expired: Joi.bool().label("expired"),
  });
  return schema.validate(data);
};

export default ExpiredStatement;
