import express from 'express';
import {
    getAdmins,
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    updateAdminAvatar,
    deleteAdminImage,
    updateEmailAndPasswordForAdmin,
  
} from '../controllers/adminController.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Get all admins
router.get('/', getAdmins);

// Get single admin by ID
router.get('/:id', getAdmin);

// Create a new admin
router.post('/create', createAdmin);


router.put('/updateAdmin/:userId', upload.single('avatar'), updateAdmin);
router.put('/:id',upload.single('Avatar'), updateAdminAvatar);
router.delete('/deleteAdminImage', deleteAdminImage);
router.put('/updateAdminEmailAndPassword/:id',updateEmailAndPasswordForAdmin);


// Delete an admin
router.delete('/:id', deleteAdmin);

export default router;
