import multer from "multer";

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public"); // Store in public folder
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Keep original file name
    }
});

let upload = multer({ storage }); // ✅ wrap storage in object

export default upload;
