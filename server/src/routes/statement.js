import express from "express";
import {
  createStatement,

  // deleteStatement,
  updateStatement,
} from "../controllers/statementManipulating.js";
import {
  getAllStatements,
  getOneStatement,
  getUserStatements,
} from "../controllers/statementGet.js";

const statementRouter = express.Router();

statementRouter.get("/", getAllStatements);

statementRouter.get("/:id", getOneStatement);

statementRouter.get("/user_statements/:id", getUserStatements);

// statementRouter.delete("/:id", deleteStatement);

statementRouter.patch("/:id", updateStatement);

statementRouter.post("/create", createStatement);

export default statementRouter;
