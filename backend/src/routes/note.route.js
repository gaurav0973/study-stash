import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { upload } from "../middlewares/multer.js";
import {
  getAllNotes,
  getNoteById,
  getNotesByUniversity,
  getUserNotes,
  searchNotesByTitle,
  uploadNote,
} from "../controllers/note.controller.js";

const noteRouter = express.Router();

noteRouter.post("/upload", isLoggedIn, upload.single("file"), uploadNote);
noteRouter.get("/all", isLoggedIn, getAllNotes);
noteRouter.get("/search", isLoggedIn, searchNotesByTitle);
noteRouter.get("/university/:university", isLoggedIn, getNotesByUniversity);
noteRouter.get("/my-notes", isLoggedIn, getUserNotes);
noteRouter.get("/:id", isLoggedIn, getNoteById);

export default noteRouter;
