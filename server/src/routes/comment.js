import express from "express";
import {
  createComment,
  getAllComments,
  updateComment,
} from "../controllers/commentManipulating.js";

const commentRouter = express.Router();

commentRouter.get("/:id", getAllComments);

commentRouter.patch("/:id", updateComment);

commentRouter.post("/create", createComment);

export default commentRouter;
