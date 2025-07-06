import express from "express";
import { getProfile, login, logout, registerUser } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";


const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", login)
userRouter.post("/logout", isLoggedIn, logout)
userRouter.get("/getProfile", isLoggedIn, getProfile)

export default userRouter;