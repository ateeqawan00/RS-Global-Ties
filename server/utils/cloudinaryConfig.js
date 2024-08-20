import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../config/config.js';
import fs from 'fs';
import cloudinary from './cloudinaryInit.js';





export const cloudinaryConfig = cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

export const uploadImages = async (files) => {
    const uploader = async (file) => {
        let uploadOptions = { folder: "games" };
        if (file.mimetype.startsWith('image')) {
            return await cloudinary.v2.uploader.upload(file.path, uploadOptions);
        } else if (file.mimetype.startsWith('video')) {
            uploadOptions.resource_type = 'video';
            return await cloudinary.v2.uploader.upload(file.path, uploadOptions);
        } else if (file.mimetype.startsWith('audio')) {
            uploadOptions.resource_type = 'auto'; 
            return await cloudinary.v2.uploader.upload(file.path, uploadOptions);
        } else if (file.mimetype.startsWith('application/pdf')) {
            uploadOptions.folder = "pdfs";
            return await cloudinary.v2.uploader.upload(file.path, uploadOptions);
        } else {
            // For unsupported file types, treat them as raw format
            uploadOptions.resource_type = 'raw';
            return await cloudinary.v2.uploader.upload(file.path, uploadOptions);
        }
    };

    const mediaUrls = [];

    for (const file of files) {
        let newPath;
        newPath = await uploader(file);
        mediaUrls.push(newPath);
        fs.unlinkSync(file.path);
    }

    return mediaUrls.map(url => ({ url: url.secure_url, cloudinaryId: url.public_id }));
};
