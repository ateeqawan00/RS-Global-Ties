import mongoose from 'mongoose';

const UserServiceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    
    },
    title: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
    },
    accountType: {
        type: String,
    },
    adminFullName: {
        type: String,
    },
    adminAccountType: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    durationOfService: {
        type: String,
    },
    serviceDeliveryMethod: {
        type: String,
    },
    workplaceType: {
        type: String,
    },
    location: {
        type: String,
    },
    yearsOfExperienceRequired: {
        type: String,
    },
    professionalCertification: {
        type: String,
    },
    skillsExpertiseNeeded: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.model('Services', UserServiceSchema);
