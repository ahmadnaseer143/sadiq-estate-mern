import express from "express";
import mongoose from "mongoose";
const app = express();
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
dotenv.config();
mongoose
  .connect(process.env.Mongo)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use("/api/user", userRouter);
