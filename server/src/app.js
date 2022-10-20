import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import authRouter from "./routes/authentication.js";
import statementRouter from "./routes/statement.js";
import commentRouter from "./routes/comment.js";
import dataRouter from "./routes/database.js";

const app = express();

app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());

// API routes
app.use("/api/user", userRouter);
app.use("/api/profile", userRouter);
app.use("/api/authentication", authRouter);
app.use("/api/statements", statementRouter);
app.use("/api/comments", commentRouter);
app.use("/api/database", dataRouter);

export default app;
