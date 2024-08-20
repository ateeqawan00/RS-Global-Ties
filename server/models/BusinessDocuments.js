// backend/models/BusinessDocument.js
import mongoose from 'mongoose';

const BusinessDocumentSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    pdfUrls: {
        type: [String], // Array of strings to store multiple URLs
        required: true,
    },
});

export default mongoose.model("BusinessDocument", BusinessDocumentSchema);
