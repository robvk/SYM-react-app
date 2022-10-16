import express from "express";
import {
  createComment,
  getAllComments,
} from "../controllers/commentManipulating.js";

const commentRouter = express.Router();

commentRouter.get("/:id", getAllComments);

commentRouter.post("/create", createComment);

export default commentRouter;
