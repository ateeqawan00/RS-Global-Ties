import Services from "../models/Services.js";;
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import CompanyProfile from "../models/CompanyProfile.js";


export const createService = async (req, res, next) => {
    try {
        const { 
            title, 
            description, 
            durationOfService,
            serviceDeliveryMethod,
            workplaceType,
            location,
            yearsOfExperienceRequired,
            professionalCertification,
            skillsExpertiseNeeded
        } = req.body;
        
        const userId = req.user._id; 

      
        const companyProfile = await CompanyProfile.findOne({ userId });
        if (!companyProfile) {
            return res.status(403).json({ error: 'Company profile does not exist. Please create a company profile before adding services.' });
        }

        const newService = new Services({
            userId,
            adminId: req.user.adminId, 
            title,
            description,
            durationOfService,
            serviceDeliveryMethod,
            workplaceType,
            location,
            yearsOfExperienceRequired,
            professionalCertification,
            skillsExpertiseNeeded,
            adminFullName: req.user.adminFullName, 
            adminAccountType: req.user.adminAccountType 
        });

        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        next(error);
    }
};




export const getUserServices = async (req, res, next) => {
    try {
        const userId = req.user._id;
   
        const user = await User.findById(userId);

       
        const userServices = await Services.find({ userId });

      
        const responseObject = {
            user: {
                _id: user._id,
                fullName: user.fullName,
                accountType: user.accountType,
                isCompanyVerified: user.isCompanyVerified
            },
            services: userServices
        };

        res.status(200).json(responseObject);
    } catch (error) {
        next(error);
    }
}


export const getAllServices = async (req, res, next) => {
    try {
        const latestServices = await Services.aggregate([
            { $sort: { userId: 1, createdAt: -1 } }, 
            {
                $group: {
                    _id: "$userId",
                    latestService: { $first: "$$ROOT" } 
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
            { $unwind: "$user" },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "user._id",
                    foreignField: "userId",
                    as: "subscription"
                }
            },
            { $unwind: "$subscription" },
            {
                $project: {
                    "user._id": 1,
                    "user.fullName": 1,
                    "user.accountType": 1,
                    "user.isCompanyVerified": 1,
                    "user.country": 1,
                    "subscription.planKey": 1,
                    "latestService": 1
                }
            }
        ]);

        res.status(200).json(latestServices);
    } catch (error) {
        next(error);
    }
}






export const getAllPremiumServices = async (req, res, next) => {
    try {
        const latestServices = await Services.aggregate([
            { $sort: { userId: 1, createdAt: -1 } }, // Sort by userId and createdAt field in descending order
            {
                $group: {
                    _id: "$userId",
                    latestService: { $first: "$$ROOT" } // Get the first document (latest service) for each userId
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
            { $unwind: "$user" },
            {
                $lookup: {
                    from: "Subscriptions", // Capital "S" for Subscriptions
                    localField: "user._id",
                    foreignField: "userId",
                    as: "subscription"
                }
            },
            { $unwind: "$subscription" },
            {
                $match: {
                    "subscription.planKey": "platinum" // Filter by subscription planKey
                }
            },
            {
                $project: {
                    "user._id": 1,
                    "user.fullName": 1,
                    "user.accountType": 1,
                    "user.isCompanyVerified": 1,
                    "user.country": 1,
                    "subscription.planKey": 1,
                    "latestService": 1
                }
            }
        ]);

        res.status(200).json(latestServices);
    } catch (error) {
        next(error);
    }
}



export const createServiceByAdmin = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const adminId = req.params.AdminId; 

    
        const admin = await Admin.findById(adminId).select('fullName');

        if (!admin) {
            const error = new Error('Admin not found');
            error.status = 404;
            throw error;
        }

        if (!title || !description) {
            const error = new Error('Title and description are required');
            error.status = 400;
            throw error;
        }

    
        const newService = new Services({
            adminId: admin._id,
            title,
            description,
        });

        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        console.error('Error creating service by admin:', error); 

        if (error.message === 'Title and description are required') {
            return res.status(400).json({ error: 'Title or description is required' });
        } else if (error.message === 'Admin not found') {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.status(500).json({ error: 'Something went wrong!' }); 
    }
}









export const CreateServiceProvider = async (req, res, next) => {
    try {
        const { 
            title, 
            description, 
            durationOfService,
            serviceDeliveryMethod,
            workplaceType,
            location,
            yearsOfExperienceRequired,
            professionalCertification,
            skillsExpertiseNeeded
        } = req.body;
        
        const userId = req.user._id; 

      
        const companyProfile = await CompanyProfile.findOne({ userId });
        if (!companyProfile) {
            return res.status(403).json({ error: 'Company profile does not exist. Please create a company profile before adding services.' });
        }

        // Proceed with service creation
        const newService = new Services({
            userId,
            adminId: req.user.adminId, 
            title,
            description,
            durationOfService,
            serviceDeliveryMethod,
            workplaceType,
            location,
            yearsOfExperienceRequired,
            professionalCertification,
            skillsExpertiseNeeded,
            adminFullName: req.user.adminFullName, 
            adminAccountType: req.user.adminAccountType 
        });

        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        if (error.message === 'Title and description are required') {
            return res.status(400).json({ error: 'Title or description is required' });
        } else if (error.message === 'User not found') {
            return res.status(404).json({ error: 'User not found' });
        }
        next(error);
    }
};







export const getAllServicesForProvider = async (req, res, next) => {
    try {
        const latestServices = await Services.aggregate([
            { $sort: { userId: 1, createdAt: -1 } }, // Sort by userId and createdAt field in descending order
            {
                $group: {
                    _id: "$userId",
                    latestService: { $first: "$$ROOT" } // Get the first document (latest service) for each userId
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
            { $unwind: "$user" },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "user._id",
                    foreignField: "userId",
                    as: "subscription"
                }
            },
            { $unwind: "$subscription" },
            {
                $project: {
                    "user._id": 1,
                    "user.fullName": 1,
                    "user.accountType": 1,
                    "user.isCompanyVerified": 1,
                    "user.country": 1,
                    "subscription.planKey": 1,
                    "latestService": 1
                }
            }
        ]);

        res.status(200).json(latestServices);
    } catch (error) {
        next(error);
    }
}