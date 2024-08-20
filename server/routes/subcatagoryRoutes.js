import express from 'express'
import  {createSubcategories,getAllSubcategories,editSubcategory,deleteSubcategory} from "../controllers/subCatagoryController.js"
const router = express.Router();




router.post("/createSubCatagory",createSubcategories)

router.get("/getAllSubcategories/:categoryId",getAllSubcategories)
router.put("/getAllSubcategories/:subcategoryId",editSubcategory)
router.delete("/getAllSubcategories/:subcategoryId",deleteSubcategory)




export default router;
