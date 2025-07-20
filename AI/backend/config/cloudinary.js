import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Cloudinary Config (do only once globally)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to Upload File
const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null;

        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto', // can handle images, videos, pdfs, etc.
        });

        fs.unlinkSync(filePath); // delete local file after upload
        return result.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};

export { uploadOnCloudinary, cloudinary };
