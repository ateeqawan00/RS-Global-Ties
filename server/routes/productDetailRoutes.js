import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import express from 'express';
import {createProduct,getUserProducts,getLatestPremiumProducts,fetchPremiumProducts,fetchGoldAndSilverProducts,getSingleProduct,getSingluserProduct,getProducts,searchPlatinumProducts,updateProduct,deleteProduct,getProductsBySubscription}from "../controllers/productDetailController.js"
import {auth }from "../middleware/auth.js"

const router = express.Router();

router.post('/productDetail', auth, upload.array('productAvatar', 5), createProduct);
router.get("/getProduct",getProducts)
router.post("/getProductsBySubscription",getProductsBySubscription)
router.get('/getUserProduct',auth,getUserProducts);
router.get("/getPremiumProduct",getLatestPremiumProducts)
router.get("/fetchPremiumProducts",fetchPremiumProducts)
router.get("/fetchGoldAndSilverProducts",fetchGoldAndSilverProducts)
router.get('/:productId',getSingleProduct);
router.get("/user/:userId",getSingluserProduct)
router.get("/searchPlatinumProducts",searchPlatinumProducts)
router.put('/productDetail/:productId', auth, upload.array('productAvatar', 5), updateProduct);
router.delete('/productDetail/:productId', auth, deleteProduct);


export default router;