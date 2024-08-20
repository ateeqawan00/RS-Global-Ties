import Joi from 'joi';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import { createError } from '../utils/createError.js';
import  {uploadImages} from  "../utils/cloudinaryConfig.js"

const salt = bcrypt.genSaltSync(10);

export const getAdmins = async (req, res, next) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (err) {
        next(err);
    }
}

export const getAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return next(createError(404, "Admin not found"));
        }
        res.status(200).json(admin);
    } catch (err) {
        next(err);
    }
}



export const createAdmin = async (req, res, next) => {
    const validation = Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
        country: Joi.string().required(),
    }).validate(req.body);

    if (validation.error) {
        return next(createError(400, validation.error.details[0].message));
    }

    try {
        const { fullName, email, password, country } = req.body;
        const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });

        if (existingAdmin) {
            return next(createError(400, "Email already exists"));
        }

        const hash = bcrypt.hashSync(password, salt);
        const admin = new Admin({
            fullName,
            email: email.toLowerCase(),
            password: hash,
            country,
        });

        await admin.save();
        res.status(201).json(admin);
    } catch (err) {
        next(err);
    }
};






export const updateAdmin = async (req, res, next) => {
    try {
      const { fullName, email } = req.body;
      const userId = req.params.userId; 
  
     
      if (!req.file) {
        const error = new Error('Product image is required');
        error.status = 400;
        throw error;
      }
  

      let imageUrls;
      try {
        imageUrls = await uploadImages([req.file]);
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        throw createError(500, 'Image upload failed');
      }
  
      const user = await Admin.findById(userId);
  
      if (!user) {
        throw createError(404, 'User not found');
      }

      if (fullName) {
        user.fullName = fullName;
      }
  
      if (email) {
        user.email = email.toLowerCase();
      }
  
      user.avatar = imageUrls[0].url;
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: 'Admin information updated successfully.',
        userData: {
          user_id: user._id,
          fullName: user.fullName,
          email: user.email,
          avatar: user.avatar, 
        },
      });
    } catch (error) {
      console.error('Error updating user information:', error);
      next(error);
    }
}


export const updateAdminAvatar = async (req, res, next) => {
    try {
        const userId = req.params.userId; 
      if (!req.file) {
        const error = new Error('Avatar image is required');
        error.status = 400;
        throw error;
      }
      let imageUrls;
      try {
        imageUrls = await uploadImages([req.file]);
      } catch (uploadError) {
        console.error('Error uploading avatar image:', uploadError);
        throw createError(500, 'Avatar image upload failed');
      }
  
      const user = await Admin.findById(userId);
  
      if (!user) {
        throw createError(404, 'User not found');
      }
      user.avatar = imageUrls[0].url;
      await user.save()
      res.status(200).json({
        success: true,
        message: 'User avatar updated successfully.',
        userData: {
          user_id: user._id,
          Avatar: user.avatar,
        },
      });
    } catch (error) {
      
      next(error);
    }
  };


  export const deleteAdminImage = async (req, res, next) => {
    try {
      const userId = req.user._id;
  
      const user = await Admin.findById(userId);
  
      if (!user) {
        throw createError(404, 'User not found');
      }
  
      // Remove avatar field
      user.avatar = undefined;
  
      // Save user changes
      await user.save();
  
      res.status(200).json({
        success: true,
        message: 'User image deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting user image:', error);
      next(error);
    }
  };
  

export const deleteAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findByIdAndRemove(req.params.id);
        if (!admin) {
            return next(createError(404, "Admin not found"));
        }
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (err) {
        next(err);
    }
};


export const updateEmailAndPasswordForAdmin = async (req, res, next) => {
  try {
    const AdminIdToUpdate = req.params.id; 
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error('Email and password are required');
      error.status = 400;
      throw error;
    }

    const AdminToUpdate = await Admin.findById(AdminIdToUpdate); 

    if (!AdminToUpdate) { 
      throw createError(404, 'Admin not found');
    }

    AdminToUpdate.email = email;
    AdminToUpdate.password = password;

    await AdminToUpdate.save();

    res.status(200).json({
      success: true,
      message: 'Admin email and password updated successfully.',
      AdminData: {
        admin_id: AdminToUpdate._id,
        Admin_email: AdminToUpdate.email, 
      },
    });
  } catch (error) {
    next(error);
  }
};



