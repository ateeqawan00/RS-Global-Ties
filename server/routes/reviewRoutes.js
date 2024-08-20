
import express from 'express';
import {auth}  from "../middleware/auth.js"
import {review,getProductReviews} from "../controllers/reviewController.js"
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = express.Router();


router.post("/AddReview",auth,review)
router.get('/:productId', getProductReviews);






export default router;