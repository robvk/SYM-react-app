import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  getTaggers,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.post("/create", createUser);

userRouter.get("/:id", getUser);

userRouter.delete("/:id", deleteUser);

userRouter.patch("/:id", updateUser);

userRouter.post("/taggers", getTaggers);

export default userRouter;
