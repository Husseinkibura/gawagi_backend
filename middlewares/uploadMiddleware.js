import multer from "multer";
import path from "path";
import fs from "fs";

// Get the absolute path to the uploads/contracts directory
const uploadDir = path.join(process.cwd(), "uploads", "contracts");

// Ensure the uploads/contracts directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in the "uploads/contracts" folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Add a unique suffix to the filename
  },
});

// Filter for allowed file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(extname)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, Word, and Image files are allowed."), false);
  }
};

// Initialize multer
const upload = multer({ storage, fileFilter });

export default upload;