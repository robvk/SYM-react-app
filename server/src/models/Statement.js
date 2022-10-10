import mongoose from "mongoose";
import Joi from "joi";

const statementSchema = new mongoose.Schema({
  userID: { type: String },
  taggersID: [{ type: String, required: false }],
  fullStatement: { type: String, required: true },
  statementStart: { type: String, required: true },
  statementEnd: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  upVotes: [{ type: String, required: false }],
  downVotes: [{ type: String, required: false }],
});

const Statement = mongoose.model("statements", statementSchema);

export const validateStatement = (data) => {
  const schema = Joi.object({
    userID: Joi.string().min(1).required().label("userID"),
    fullStatement: Joi.string().min(1).required().label("fullStatement"),
    statementStart: Joi.string().min(1).required().label("statementStart"),
    statementEnd: Joi.string().min(1).required().label("statementEnd"),
    dateCreated: Joi.date().required().label("dateCreated"),
    upVotes: Joi.array().label("upVotes"),
    downVotes: Joi.array().label("downVotes"),
    taggersID: Joi.array().label("taggersID"),
  });
  return schema.validate(data);
};

export default Statement;
