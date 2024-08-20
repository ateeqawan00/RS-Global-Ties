


import Joi from 'joi';
import Requirement from '../models/Requirements.js';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import { createError } from '../utils/createError.js';
import  CompanyProfile from "../models/CompanyProfile.js"

export const addRequirement = async (req, res, next) => {
    try {
        
        const userId = req.user._id; 

        const {
            name,
            timeOfValidity,
            buyingFrequency,
            quantityRequired,
            quantityUnit,
            annualPurchasedVolume,
            volumeUnit,
            description,
            shipmentTerm,
            destinationPort,
            paymentType,
            regionsLookingFor,
            regionsToAvoid,
        } = req.body;

        // Validate input data
        const schema = Joi.object({
            name: Joi.string().required(),
            timeOfValidity: Joi.date().required(),
            buyingFrequency: Joi.string().required(),
            quantityRequired: Joi.number().required(),
            quantityUnit: Joi.string().required(),
            annualPurchasedVolume: Joi.number().required(),
            volumeUnit: Joi.string().required(),
            description: Joi.string(),
            shipmentTerm: Joi.string().required(),
            destinationPort: Joi.string().required(),
            paymentType: Joi.string().required(),
            regionsLookingFor: Joi.string().required(),
            regionsToAvoid: Joi.string(),
        });

        const { error } = schema.validate({
            name,
            timeOfValidity,
            buyingFrequency,
            quantityRequired,
            quantityUnit,
            annualPurchasedVolume,
            volumeUnit,
            description,
            shipmentTerm,
            destinationPort,
            paymentType,
            regionsLookingFor,
            regionsToAvoid,
        });

        if (error) {
        
            const validationError = createError(400, error.details[0].message);
            throw validationError;
        }

        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: "User not found.",
            });
        }

        const companyProfile = await CompanyProfile.findOne({ userId });
        if (!companyProfile) {
            return res.status(403).json({
                error: "Users without a company profile cannot add requirements.",
            });
        }

        const newRequirement = await Requirement.create({
            userId,
            name,
            timeOfValidity,
            buyingFrequency,
            quantityRequired,
            quantityUnit,
            annualPurchasedVolume,
            volumeUnit,
            description,
            shipmentTerm,
            destinationPort,
            paymentType,
            regionsLookingFor,
            regionsToAvoid,
        });

        const { fullName: userName, accountType } = user;

        const responseObject = {
            userId,
            userName,
            accountType,
            requirement: newRequirement,
        };

        res.status(201).json(responseObject);
    } catch (error) {
        console.error('Error adding requirement:', error);

        next(error);
    }
};


export const getRequirementsByUserId = async (req, res, next) => {
    try {
  
      const userId = req.user._id; 
  
    
      const schema = Joi.object({
        userId: Joi.string().required(),
      });
  
      const { error } = schema.validate({ userId });
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
     
      const requirements = await Requirement.find({ userId }).exec();
  
    
      const userSubscription = await Subscription.findOne({ userId }).exec();
      const subscriptionPlan = userSubscription ? userSubscription.plan : 'free';
  
      res.status(200).json({ requirements, subscriptionPlan });
    } catch (error) {
      console.error('Error retrieving requirements:', error);
      next(error); 
    }
  };



  export const updateRequirement = async (req, res, next) => {
    try {
        
        const requirementId = req.params.requirementId;

        const userId = req.user._id;

   
        const {
            name,
            timeOfValidity,
            buyingFrequency,
            quantityRequired,
            quantityUnit,
            annualPurchasedVolume,
            volumeUnit,
            description,
            shipmentTerm,
            destinationPort,
            paymentType,
            regionsLookingFor,
            regionsToAvoid,
        } = req.body;

      
        const schema = Joi.object({
            name: Joi.string().required(),
            timeOfValidity: Joi.date().required(),
            buyingFrequency: Joi.string().required(),
            quantityRequired: Joi.number().required(),
            quantityUnit: Joi.string().required(),
            annualPurchasedVolume: Joi.number().required(),
            volumeUnit: Joi.string().required(),
            description: Joi.string(),
            shipmentTerm: Joi.string().required(),
            destinationPort: Joi.string().required(),
            paymentType: Joi.string().required(),
            regionsLookingFor: Joi.string().required(),
            regionsToAvoid: Joi.string().required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            throw createError(400, error.details[0].message);
        }

      
        const existingRequirement = await Requirement.findOne({ _id: requirementId, userId });

        if (!existingRequirement) {
            throw createError(404, 'Requirement not found');
        }

    
        Object.assign(existingRequirement, {
            name,
            timeOfValidity,
            buyingFrequency,
            quantityRequired,
            quantityUnit,
            annualPurchasedVolume,
            volumeUnit,
            description,
            shipmentTerm,
            destinationPort,
            paymentType,
            regionsLookingFor,
            regionsToAvoid,
        });

       
        const updatedRequirement = await existingRequirement.save();

    
        res.status(200).json({ requirement: updatedRequirement });
    } catch (error) {
        console.error('Error updating requirement:', error);
        next(error);
    }
};




// export const getLatestRequirements = async (req, res, next) => {
//     try {
//         const latestRequirements = await Requirement.aggregate([
//             { $sort: { userId: 1, createdAt: -1 } }, 
//             {
//                 $group: {
//                     _id: "$userId",
//                     latestRequirement: { $first: "$$ROOT" } 
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "users",
//                     localField: "_id",
//                     foreignField: "_id",
//                     as: "user"
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "Subscriptions",
//                     localField: "user._id",
//                     foreignField: "userId",
//                     as: "subscription"
//                 }
//             },
//             { $unwind: "$user" },
//             { $unwind: "$subscription" },
//             {
//                 $project: {
//                     "user._id": 1,
//                     "user.fullName": 1,
//                     "user.accountType": 1,
//                     "user.country": 1,
//                     "user.isCompanyVerified": 1,
//                     "subscription.planKey": 1,
//                     "latestRequirement": 1
//                 }
//             }
//         ]);

//         console.log("Latest Requirements:", latestRequirements); // Log the fetched data

//         res.status(200).json(latestRequirements);
//     } catch (error) {
//         console.error("Error fetching latest requirements:", error); // Log the error
//         next(error);
//     }
// }


//new requirements added
export const getLatestRequirements = async (req, res, next) => {
    try {
        const latestRequirements = await Requirement.aggregate([
            { $sort: { userId: 1, createdAt: -1 } }, // Sort by userId and createdAt in descending order
            {
                $group: {
                    _id: "$userId",
                    latestRequirement: { $first: "$$ROOT" } // Get the first document for each userId
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" }, // Unwind the user array to get a single user object
            {
                $project: {
                    "user._id": 1,
                    "user.fullName": 1,
                    "user.accountType": 1,
                    "user.country": 1,
                    "user.isCompanyVerified": 1,
                    "latestRequirement": 1
                }
            }
        ]);

        res.status(200).json(latestRequirements);
    } catch (error) {
        console.error("Error fetching latest requirements:", error);
        next(error);
    }
}