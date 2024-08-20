
import BusinessDocuments from "../models/BusinessDocuments.js";

import { uploadImages } from "../utils/cloudinaryConfig.js";
import User from "../models/User.js";

//new changes

export const uploadBusinessDocuments = async (req, res, next) => {
    console.log("hello")
    try {
        if (!req.files || req.files.length === 0) {
            const error = new Error('PDF files are required');
            error.status = 400;
            throw error;
        }

        console.log('Received files:', req.files); // Log received files

        const pdfUrls = await uploadImages(req.files); // Assuming uploadImages accepts an array of files

        const userId = req.user._id;

        console.log('User ID:', userId); // Log user ID

        // Check if the user has already uploaded a document
        const existingDocument = await BusinessDocuments.findOne({ userId });

        if (existingDocument) {
            console.log('User already has a business document');
            return res.status(400).json({ error: 'User already has a business document' });
        }

        const user = await User.findById(userId).select('fullName accountType');

        if (!user) {
            console.log('User not found');
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        const newBusinessDocument = new BusinessDocuments({ userId, pdfUrls: pdfUrls.map(file => file.url) });
        const savedBusinessDocument = await newBusinessDocument.save();

        console.log('Business document saved:', savedBusinessDocument); // Log saved document

        res.status(201).json(savedBusinessDocument);
    } catch (error) {
        console.error('Error in uploadBusinessDocuments:', error); // Log error
        next(error);
    }
};