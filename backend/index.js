import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./src/routes/user.route.js";
import connectDB from "./src/db/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(cookieParser());

// Debug middleware to check request body
app.use((req, res, next) => {
  console.log("Request Body:", req.body);
  next();
});

// routes
app.use("/api/v1/user", userRouter);

// database connection

app.listen(port, () => {
  connectDB();
  console.log("🛞  Server is running at port : ", port);
});
