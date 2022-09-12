import express from "express";
import { countJobs } from "../controllers/graphs.js";

const statementRouter = express.Router();

statementRouter.get("/values", countJobs);

export default statementRouter;
