import express from 'express';
import { auth } from "../middleware/auth.js";
import { serviceProvider ,getLatestServices} from "../controllers/serviceProviderController.js";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post("/serviceProvider", upload.array('documentPicture', 5),auth, serviceProvider);
router.get("/getLatestServices",auth,getLatestServices)

export default router;
