
import express from 'express'
import {auth}  from "../middleware/auth.js"
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import {uploadBusinessDocuments}  from "../controllers/businessDocumentController.js"



const router = express.Router();


router.post('/uploadBusinessDocuments', auth, upload.array('pdfUrls', 15), uploadBusinessDocuments);


export default router;