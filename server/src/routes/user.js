import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  getTaggers,
  // updatePassword,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);

userRouter.post("/create", createUser);
userRouter.post("/taggers", getTaggers);

userRouter.patch("/:id", updateUser);
// userRouter.patch("/:id", updatePassword);

userRouter.delete("/:id", deleteUser);

export default userRouter;
