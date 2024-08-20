


import express from 'express';
import {addRequirement,getRequirementsByUserId,updateRequirement,getLatestRequirements}  from "../controllers/requirementsController.js"
import {auth}  from "../middleware/auth.js"


const router = express.Router();



router.post("/addRequirement",auth,addRequirement);

router.get('/getRequirement',auth,getRequirementsByUserId);
router.put('/updateRequirement/:requirementId',auth,updateRequirement)
router.get('/getLatestRequirements',getLatestRequirements);





export default router;