import express from 'express';
import {createSuccessStories,getSuccessStories} from "../controllers/SucessStoriesController.js"
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
const router = express.Router();


router.post("/createSuccessStories",upload.single('avatar'),createSuccessStories)
router.get("/getSuccessStories",getSuccessStories)





export default router;