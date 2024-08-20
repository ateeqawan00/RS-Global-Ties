
import SuccessStories from "../models/SuccessStories.js"
import { uploadImages } from '../utils/cloudinaryConfig.js'



export const createSuccessStories =async (req,res)=>{
    try {
  
        const { fullName, jobName, description } = req.body;
        
  
        if (!req.file) {
          return res.status(400).json({ message: 'Avatar image is required' });
        }
    
      
        const uploadedImages = await uploadImages([req.file]);
        const avatarUrl = uploadedImages[0].url; 
    
        
        const newSuccessStory = new SuccessStories({
          fullName,
          avatar: avatarUrl,
          jobName,
          description
        });
    
      
        const savedSuccessStory = await newSuccessStory.save();
    
        res.status(201).json(savedSuccessStory);
      } catch (error) {
        console.error('Error adding success story:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }



export const getSuccessStories =async(req,res)=>{
    try {
       
        const successStories = await SuccessStories.find();
    
        res.json(successStories);
      } catch (error) {
        console.error('Error fetching success stories:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }


