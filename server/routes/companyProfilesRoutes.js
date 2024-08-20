import express from 'express';
import {auth}  from "../middleware/auth.js"
import { createCompanyProfile,getCompanyProfile,updateCompanyProfile } from '../controllers/companyProfileController.js';


const router = express.Router();



router.post("/createCompanyProfiles",auth,createCompanyProfile);
router.get('/getCompanyProfiles', auth, getCompanyProfile);
router.put('/getCompanyProfiles', auth, updateCompanyProfile);







export default router;