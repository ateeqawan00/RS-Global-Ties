
import Catagory from "../models/Catagory.js";



export const createCatagory= async (req, res) => {
    try {
      const newCatagory = new Catagory(req.body); 
      await newCatagory.save();
      res.status(201).json(newCatagory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};




export const getAllCategories = async (req, res) => {
    try {
      const categories = await Catagory.find() // Populate subcategories
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  
export const getCatagoryById= async (req, res) => {
    try {
      const category = await Catagory.findById(req.params.Id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  

  export const updateCategory = async (req, res) => {
    try {
      const category = await Catagory.findByIdAndUpdate(req.params.Id, req.body, { new: true });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
 
 
  
  
  export const deleteCategory = async (req, res) => {
    try {
      const category = await Catagory.findByIdAndDelete(req.params.Id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };