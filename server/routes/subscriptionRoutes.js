import express from 'express';
import {subscribeUser,StripeSuccess,getAllUsersInformation,getUsersWithPlatinumPlan,deleteUser,suspendUser} from "../controllers/subscription.js"
import {auth}  from "../middleware/auth.js"
import { webhookHandler } from '../controllers/subscription.js';
import { rawJsonMiddleware } from '../middleware/webhook.js';

const router = express.Router();



router.post("/subscription",auth,subscribeUser);
router.post("/webhook",webhookHandler)
router.get("/getAllUsersInformation",getAllUsersInformation)
router.get("/getUsersWithPlatinumPlan",getUsersWithPlatinumPlan)
router.delete("/deleteUser/:userId",deleteUser)
router.post("/suspendUser/:userId",suspendUser)







export default router;