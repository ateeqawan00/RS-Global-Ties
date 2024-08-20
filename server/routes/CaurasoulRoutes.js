


import express from 'express';
import {auth}  from "../middleware/auth.js"
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import {Addcaurasol,getCaurosol,deleteCaurosol,getAllCarouselItems} from '../controllers/Caurasol.js';


const router = express.Router();

router.post("/AddCaurasol",upload.single('Avatar'),Addcaurasol)
router.get("/getCaurosol",getCaurosol)
router.delete("/deleteCarasoul/:id",deleteCaurosol)
router.get("/getAllCarouselItems",getAllCarouselItems)







export default router;