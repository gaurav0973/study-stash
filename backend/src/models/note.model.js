import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    // Cloudinary file URL
    fileUrl: {
      type: String,
      required: true, 
    },
    // Cloudinary public_id => for deleting the file
    filePublicId: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        review: String,
      },
    ],
  },
  { timestamps: true }
);

const Note =  mongoose.model("Note", noteSchema);
export default Note;
