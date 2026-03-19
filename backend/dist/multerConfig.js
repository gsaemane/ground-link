import multer from 'multer';
import path from 'path';
// Define where and how files are stored
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
// Fixes the "implicit any" on the file filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Not an image! Please upload only images.'));
    }
};
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
//# sourceMappingURL=multerConfig.js.map