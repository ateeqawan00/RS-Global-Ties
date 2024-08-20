// ProductListRoutes.js

import express from 'express';
import multer from 'multer';
import { insertProductsFromExcel } from '../controllers/ProductListController.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/insertData', insertProductsFromExcel);

export default router;
