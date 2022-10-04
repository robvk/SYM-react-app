import express from "express";
import {
  // createStatement,
  statementTransaction,
  // deleteStatement,
  // updateStatement,
} from "../controllers/statementManipulating.js";
import {
  getAllStatements,
  getOneStatement,
} from "../controllers/statementGet.js";

const statementRouter = express.Router();

statementRouter.get("/", getAllStatements);

statementRouter.get("/:id", getOneStatement);

// statementRouter.delete("/:id", deleteStatement);

// statementRouter.patch("/:id", updateStatement);

// statementRouter.put("/:id", acceptCancelJob);

statementRouter.post("/create", statementTransaction);

export default statementRouter;
