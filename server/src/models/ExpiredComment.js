import mongoose from "mongoose";
import Joi from "joi";

const expiredCommentSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  authorID: { type: String, required: true },
  statementID: { type: String, required: true },
  statementStart: { type: String, required: true },
  statementEnd: { type: String, required: true },
  upVotes: [{ type: String, required: false }],
  netVotes: { type: Number, required: false },
  downVotes: [{ type: String, required: false }],
});

const ExpiredComment = mongoose.model("expiredComments", expiredCommentSchema);

export const validateExpiredComment = (data) => {
  const schema = Joi.object({
    userID: Joi.string().min(1).required().label("userID"),
    authorID: Joi.string().min(1).required().label("authorID"),
    statementID: Joi.string().min(1).required().label("statementID"),
    statementStart: Joi.string().min(1).required().label("statementStart"),
    statementEnd: Joi.string().min(1).required().label("statementEnd"),
    upVotes: Joi.array().label("upVotes"),
    netVotes: Joi.number().label("upVotesCount"),
    downVotes: Joi.array().label("downVotes"),
  });
  return schema.validate(data);
};

export default ExpiredComment;
