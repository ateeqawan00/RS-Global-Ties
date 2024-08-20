import express from 'express'
import  {createCatagory,getAllCategories,getCatagoryById,updateCategory,deleteCategory} from "../controllers/catagoryControler.js"
const router = express.Router();




router.post("/createCatagory",createCatagory)

router.get("/getAllCategories",getAllCategories)

router.get("/getCatagoryById/:Id",getCatagoryById)

router.put("/updateCategory/:Id",updateCategory)

router.delete("/deleteCategory/:Id",deleteCategory)



export default router;
