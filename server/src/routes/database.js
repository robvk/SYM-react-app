import express from "express";
import { countStatements } from "../controllers/database.js";

const statementRouter = express.Router();

statementRouter.get("/values", countStatements);

export default statementRouter;
