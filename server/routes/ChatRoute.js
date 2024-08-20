


import express from 'express';
import {auth}  from "../middleware/auth.js"
import {createChat,fetchChat} from '../controllers/chatController.js';


const router = express.Router();

router.post("/createChat",auth,createChat)
router.get("/getChat",auth,fetchChat)






export default router;