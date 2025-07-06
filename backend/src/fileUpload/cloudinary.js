import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";

// Load env variables from .env file
const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({
  path: envPath,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.error("No file path provided to uploadOnCloudinary");
      return null;
    }

    // upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // console.log("File uploaded successfully to Cloudinary =>", response);

    // Delete after upload
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
  }

  return null;
};

export default uploadOnCloudinary;
