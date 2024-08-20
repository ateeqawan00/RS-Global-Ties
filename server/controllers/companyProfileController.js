import Joi from 'joi';
import { createError } from '../utils/createError.js';
import CompanyProfile from '../models/CompanyProfile.js';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';


export const createCompanyProfile = async (req, res, next) => {
  try {
      const userId = req.user._id;

      console.log("userId", userId);
      const activeSubscription = await Subscription.find({
        userId,
        expiryDate: { $gt: new Date() }
    });
    
    if (activeSubscription.length === 0) {
        return res.status(403).json({ error: 'User does not have an active subscription. Please subscribe to create a company profile.' });
    }
      console.log("activeSubscription", activeSubscription);


      const {
          companyName,
          businessType,
          officialWebsite,
          registeredAddress,
          operationalAddress,
          yearEstablished,
          mainProducts,
          aboutUs,
      } = req.body;

      const schema = Joi.object({
          companyName: Joi.string().required(),
          businessType: Joi.array().items(Joi.string().valid('Online Shop/Store', 'Manufacturer/Factory', 'Trading Company', 'Distributor/Wholesaler', 'Retailer', 'Buying Office', 'Individual', 'Other', 'Service Provider')).required(),
          officialWebsite: Joi.string(),
          registeredAddress: Joi.object({
              country: Joi.string(),
              state: Joi.string(),
              city: Joi.string(),
              street: Joi.string(),
          }),
          operationalAddress: Joi.object({
              country: Joi.string(),
              provinceState: Joi.string(),
              city: Joi.string(),
              street: Joi.string(),
          }),
          yearEstablished: Joi.number(),
          mainProducts: Joi.array().items(Joi.string()),
          aboutUs: Joi.string(),
      });

      const { error } = schema.validate({
          companyName,
          businessType,
          officialWebsite,
          registeredAddress,
          operationalAddress,
          yearEstablished,
          mainProducts,
          aboutUs,
      });

      if (error) {
          const validationError = createError(400, error.details[0].message);
          throw validationError;
      }

      const newCompanyProfile = await CompanyProfile.create({
          userId,
          companyName,
          businessType,
          officialWebsite,
          registeredAddress,
          operationalAddress,
          yearEstablished,
          mainProducts,
          aboutUs,
      });

      res.status(201).json({ status: 201, data: newCompanyProfile });
  } catch (error) {
      console.error('Error creating company profile:', error);
      next(error);
  }
};



export const getCompanyProfile = async (req, res) => {
    try {
        
        const userId = req.user._id;

    
        const user = await User.findById(userId);
        const userName = user.fullName; 
        const accountType = user.accountType;

      
        const companyProfile = await CompanyProfile.findOne({ userId });

        if (!companyProfile) {
         
            return res.status(404).json({ status: 404, message: 'Company profile not found' });
        }

      
        res.status(200).json({
            userId: companyProfile.userId,
            userName,
            accountType,
            data: {
                id: companyProfile._id,
                companyName: companyProfile.companyName,
                businessType: companyProfile.businessType,
                officialWebsite: companyProfile.officialWebsite,
                registeredAddress: companyProfile.registeredAddress,
                operationalAddress: companyProfile.operationalAddress,
                yearEstablished: companyProfile.yearEstablished,
                mainProducts: companyProfile.mainProducts,
                aboutUs: companyProfile.aboutUs,
            },
           
        });
    } catch (error) {
        console.error('Error retrieving company profile:', error);
       
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};



export const updateCompanyProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const {
      companyName,
      businessType,
      officialWebsite,
      registeredAddress,
      operationalAddress,
      yearEstablished,
      mainProducts,
      aboutUs,
    } = req.body;

   
    const schema = Joi.object({
      companyName: Joi.string().required(),
      businessType: Joi.array().items(Joi.string().valid('Online Shop/Store', 'Manufacturer/Factory', 'Trading Company', 'Distributor/Wholesaler', 'Retailer', 'Buying Office', 'Individual', 'Other', 'Service Provider')).required(),
      officialWebsite: Joi.string(),
      registeredAddress: Joi.object({
        country: Joi.string(),
        state: Joi.string(),
        city: Joi.string(),
        street: Joi.string(),
      }),
      operationalAddress: Joi.object({
        country: Joi.string(),
        provinceState: Joi.string(),
        city: Joi.string(),
        street: Joi.string(),
      }),
      yearEstablished: Joi.number(),
      mainProducts: Joi.array().items(Joi.string()),
      aboutUs: Joi.string(),
    });

    const { error } = schema.validate({
      companyName,
      businessType,
      officialWebsite,
      registeredAddress,
      operationalAddress,
      yearEstablished,
      mainProducts,
      aboutUs,
    });

    if (error) {
      const validationError = createError(400, error.details[0].message);
      throw validationError;
    }

 
    const companyProfile = await CompanyProfile.findOne({ userId });

    if (!companyProfile) {
      return res.status(404).json({ error: 'Company profile not found.' });
    }


    companyProfile.companyName = companyName;
    companyProfile.businessType = businessType;
    companyProfile.officialWebsite = officialWebsite;
    companyProfile.registeredAddress = registeredAddress;
    companyProfile.operationalAddress = operationalAddress;
    companyProfile.yearEstablished = yearEstablished;
    companyProfile.mainProducts = mainProducts;
    companyProfile.aboutUs = aboutUs;

    await companyProfile.save();

    res.status(200).json({ status: 200, data: companyProfile });
  } catch (error) {
    console.error('Error updating company profile:', error);
    next(error);
  }
};