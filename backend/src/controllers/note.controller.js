import uploadOnCloudinary from "../fileUpload/cloudinary.js";
import Note from "../models/note.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";

// upload notes
export const uploadNote = asyncHandler(async (req, res) => {
  //   console.log("Upload Note Controller reached");
  //   console.log("Request Body:", req.body);
  //   console.log("File:", req.file);

  const { title, description, price } = req.body;
  const file = req.file;
  if (!title || !description || !price) {
    throw new ApiError(400, "Title, description, and price are required");
  }

  if (!file) {
    throw new ApiError(400, "File is required");
  }

  //   console.log("File path:", file.path);

  const cloudinaryResult = await uploadOnCloudinary(file.path);
  if (!cloudinaryResult) {
    throw new ApiError(500, "File upload failed. Please try again.");
  }

  const note = await Note.create({
    title,
    description,
    price,
    fileUrl: cloudinaryResult.secure_url,
    filePublicId: cloudinaryResult.public_id,
    uploadedBy: req.user._id,
    university: req.user.university,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, note, "Note uploaded successfully"));
});

//get all notes
export const getAllNotes = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const notes = await Note.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Note.countDocuments();

  return res.json(
    new ApiResponse(
      200,
      {
        notes,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
      "All notes fetched"
    )
  );
});

// Search notes by title
export const searchNotesByTitle = asyncHandler(async (req, res) => {
  const { title } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  if (!title) throw new ApiError(400, "Title query is required");

  const notes = await Note.find({
    title: { $regex: title, $options: "i" },
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Note.countDocuments({
    title: { $regex: title, $options: "i" },
  });

  if (notes.length === 0) {
    return res.json(
      new ApiResponse(
        200,
        {
          notes: [],
          total: 0,
          page,
          totalPages: 0,
        },
        "No notes found matching this title"
      )
    );
  }

  return res.json(
    new ApiResponse(
      200,
      {
        notes,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
      "Notes matching title"
    )
  );
});

// Get note by ID
export const getNoteById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await Note.findById(id).populate(
    "uploadedBy",
    "username university"
  );

  if (!note) throw new ApiError(404, "Note not found");

  return res.json(new ApiResponse(200, note, "Note fetched"));
});

// Get notes by university
export const getNotesByUniversity = asyncHandler(async (req, res) => {
  const { university } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  if (!university) {
    throw new ApiError(400, "University parameter is required");
  }

  const notes = await Note.find({ university })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("uploadedBy", "username");

  const total = await Note.countDocuments({ university });

  if (notes.length === 0) {
    return res.json(
      new ApiResponse(
        200,
        {
          notes: [],
          total: 0,
          page,
          totalPages: 0,
          university,
        },
        `No notes found from ${university}`
      )
    );
  }

  return res.json(
    new ApiResponse(
      200,
      {
        notes,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        university,
      },
      `Notes from ${university}`
    )
  );
});
