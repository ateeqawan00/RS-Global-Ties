
import express from 'express';
import {auth}  from "../middleware/auth.js"
import {createService,getUserServices,getAllServices,getAllPremiumServices,createServiceByAdmin,CreateServiceProvider,getAllServicesForProvider} from "../controllers/ServiceController.js"


const router = express.Router();

//new code added
router.post("/createService",auth,createService)
router.get("/getUserServices",auth,getUserServices)
router.get("/getAllServices",getAllServices)
router.get("/getAllPremiumServices",getAllPremiumServices)
router.post("/createServiceByAdmin/:AdminId",createServiceByAdmin)
router.post("/CreateServiceProvider",auth,CreateServiceProvider)
router.get("/getAllServicesForProvider",getAllServicesForProvider)






export default router;