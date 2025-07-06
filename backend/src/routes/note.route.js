import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { upload } from "../middlewares/multer.js";
import { getAllNotes, uploadNote } from "../controllers/note.controller.js";

const noteRouter = express.Router();


noteRouter.post("/upload", isLoggedIn, upload.single("file"), uploadNote);
noteRouter.get("/all", isLoggedIn, getAllNotes);

export default noteRouter;
