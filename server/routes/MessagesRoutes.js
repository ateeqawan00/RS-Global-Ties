


import express from 'express';
import {auth}  from "../middleware/auth.js"
import {fetchMessagesOfPerticularChat,sendMessage,deleteMessage,deleteAllMessages} from "../controllers/messageController.js"
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = express.Router();


router.get("/getMessagesOfPerticularChat/:chatId",auth,fetchMessagesOfPerticularChat)
router.post("/sendMessage",auth,upload.single('media'),sendMessage)
router.delete('/deletemessages/:messageId',auth, deleteMessage);
router.delete('/deleteAllMessages',deleteAllMessages);






export default router;