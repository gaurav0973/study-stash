import express from "express";
import {
  getProfile,
  login,
  logout,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", login);
userRouter.post("/logout", isLoggedIn, logout);
userRouter.get("/getProfile", isLoggedIn, getProfile);
userRouter.put("/update", isLoggedIn, updateUser);

export default userRouter;
