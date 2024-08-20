import express from 'express';
import {updateUserInfo,verifyEmail,verifyEmailStep2,deleteImage,updateAvatar,updateEmailAndPassword} from "../controllers/UserProfileController.js"
import {auth}  from "../middleware/auth.js"
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });





const router = express.Router();


router.put('/updateProfile', auth,upload.single('Avatar'), updateUserInfo);
router.post("/VerifyEmail",auth,verifyEmail);
router.post("/VerifyEmail",auth,verifyEmailStep2);
router.delete("/deleteImage",auth,deleteImage);
router.delete("/UpdateAvatar",auth,upload.single('Avatar'),updateAvatar);
router.post("/updateEmailAndPassword",auth,updateEmailAndPassword);







export default router;