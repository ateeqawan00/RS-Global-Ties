

import caurosal from '../models/Courasol.js'
import {uploadImages} from "../utils/cloudinaryConfig.js"


export const Addcaurasol = async (req, res, next) => {
    const imageUrls = await uploadImages([req.file]);
  
    if (!req.file) {
      const error = new Error('caurasol is required');
      error.status = 400;
      throw error;
    }
  
    try {
      
      const newCarouselItem = new caurosal({ imageUrl: imageUrls[0].url });
      const savedCarouselItem = await newCarouselItem.save();
      res.status(201).json(savedCarouselItem);
    } catch (error) {
      next(error);
    }
  };



export  const  getCaurosol =async (req,res,next)=>{
    try {
    
        const carouselItems = await caurosal.find().sort({ createdAt: -1 }).limit(4);
        res.json(carouselItems);
      } catch (error) {
          next(error)
      }
}


export const deleteCaurosol = async (req, res, next) => {
    const itemId = req.params.id;
  
    try {

      const existingItem = await caurosal.findById(itemId);
      if (!existingItem) {
        return res.status(404).json({ error: 'Carousel item not found' });
      }
  
      await caurosal.findByIdAndDelete(itemId);
  
      res.json({ message: 'Carousel item deleted successfully' });
    } catch (error) {
      next(error);
    }
  };





  export const getAllCarouselItems = async (req, res, next) => {
    try {
    
      const carouselItems = await caurosal.find();
 
      res.json(carouselItems);
    } catch (error) {

      next(error);
    }
  };