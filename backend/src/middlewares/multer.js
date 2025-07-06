import multer from "multer";
import path from "path";
import fs from "fs";

// create temp if not
const tempDir = path.join(process.cwd(), "public/temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Directory where files will be stored
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    // Unique filename
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max file size
  },
});
