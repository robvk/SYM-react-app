import express from "express";
import getDatabaseNumbers from "../controllers/dataStatistics.js";

const dataRouter = express.Router();

dataRouter.get("/all", getDatabaseNumbers);

export default dataRouter;
