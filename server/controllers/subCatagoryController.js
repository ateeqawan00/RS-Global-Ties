import Subcategory from "../models/SubCatagory.js"
import Catagory from   "../models/Catagory.js"


export const createSubcategories = async (req, res) => {
  try {
    const { categoryId, names } = req.body;

    if (!Array.isArray(names) || names.length === 0) {
      return res.status(400).json({ message: "Names must be provided as a non-empty array" });
    }

    // Find the category by ID
    const category = await Catagory.findById(categoryId);
    if (!category) {
      throw new Error(`Category with ID ${categoryId} not found`);
    }

    //
    const subcategories = [];
    for (const name of names) {
      const subcategory = new Subcategory({
        names: [name],
        category: category._id 
      });
      const savedSubcategory = await subcategory.save();
      subcategories.push(savedSubcategory);
    }

    const response = {
      category: category._id,
      subcategories: subcategories.map(subcategory => subcategory.names)
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


  export const getAllSubcategories = async (req, res) => {
    try {
      const categoryId = req.params.categoryId; 
      const subcategories = await Subcategory.find({ category: categoryId });
      res.json(subcategories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  export const editSubcategory = async (req, res) => {
    try {
        const subcategoryId = req.params.subcategoryId;
        const updatedData = req.body;

        const updatedSubcategory = await Subcategory.findByIdAndUpdate(
            subcategoryId,
            updatedData,
            { new: true } 
        );

        if (!updatedSubcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        res.status(200).json(updatedSubcategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSubcategory = async (req, res) => {
    try {
        const subcategoryId = req.params.subcategoryId;

        const deletedSubcategory = await Subcategory.findByIdAndDelete(subcategoryId);

        if (!deletedSubcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        res.status(200).json({ message: "Subcategory deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};