import User from "../models/User.js"
import { sendOTPEmail } from "./Email/sendOTPEmal.js";
import { uploadImages } from "../utils/cloudinaryConfig.js";






export const updateUserInfo = async (req, res, next) => {
  try {
    const { fullName, email } = req.body;
    const userId = req.user._id;

  
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

    const user = await User.findById(userId);

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
      message: 'User information updated successfully.',
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
};




export const updateAvatar = async (req, res, next) => {
  try {
    const userId = req.user._id;
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

    const user = await User.findById(userId);

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



export const deleteImage = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

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


  export const verifyEmail = async (req, res, next) => {
    try {
      // Ensure req.user exists
      if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
  
      const user = req.user;
  
      const otp = Math.floor(1000 + Math.random() * 9000);
      const token = jwt.sign({
        id: user._id,
        otp,
        isVerified: false,
      }, jwtKey, { expiresIn: '30m' });
  
      await sendOTPEmail(user.email, otp);
  
      return res.status(200).json({ success: true, message: "OTP sent to your email", token });
    } catch (err) {
      next(err);
    }
  };
  
  
  
  export const verifyEmailStep2 = async (req, res, next) => {
    try {
      // Ensure req.user exists
      if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
  
      const user = req.user;
  
      const value = Joi.object({
        otp: Joi.number().required()
      }).validate(req.body);
  
      if (value.error) {
        return res.status(400).json({ success: false, error: value.error.details[0].message });
      }
  
      const { otp } = req.body;
  
      if (String(user.otp) === String(otp)) {
        const newToken = jwt.sign({
          id: user._id,
          isVerified: true
        }, jwtKey, { expiresIn: '30d' });
  
        return res.status(200).json({ success: true, message: "OTP verified", token: newToken });
      } else {
        return res.status(400).json({ success: false, message: "Wrong OTP" });
      }
    } catch (err) {
      next(err);
    }
  };


  export const updateEmailAndPassword = async (req, res, next) => {
    try {
      const userId = req.user._id;
      const { email, password } = req.body;
  

      if (!email || !password) {
        const error = new Error('Email and password are required');
        error.status = 400;
        throw error;
      }
  
      const user = await User.findById(userId);
      if (!user) {
        throw createError(404, 'User not found');
      }
  
    
      user.email = email;
      user.password = password;
  
 
      await user.save();
  
   
      res.status(200).json({
        success: true,
        message: 'User email and password updated successfully.',
        userData: {
          user_id: user._id,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  };