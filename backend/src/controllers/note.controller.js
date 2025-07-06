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
