import express from "express";
import {
  createStatement,
  deleteStatement,
  updateStatement,
} from "../controllers/statementsManipulating.js";
import {
  getAllStatements,
  getOneStatement,
} from "../controllers/statementsGet.js";

const statementRouter = express.Router();

statementRouter.get("/", getAllStatements);

statementRouter.get("/:id", getOneStatement);

statementRouter.delete("/:id", deleteStatement);

statementRouter.patch("/:id", updateStatement);

// statementRouter.put("/:id", acceptCancelJob);

statementRouter.post("/create", createStatement);

export default statementRouter;
