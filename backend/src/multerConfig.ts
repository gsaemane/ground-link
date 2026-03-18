import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

// Define where and how files are stored
const storage = multer.diskStorage({
  destination: (
    req: Request, 
    file: Express.Multer.File, 
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, 'uploads/');
  },
  filename: (
    req: Request, 
    file: Express.Multer.File, 
    cb: (error: Error | null, filename: string) => void
  ) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Fixes the "implicit any" on the file filter
const fileFilter = (
  req: Request, 
  file: Express.Multer.File, 
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'));
  }
};

export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter 
});