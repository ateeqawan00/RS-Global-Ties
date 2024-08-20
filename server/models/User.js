import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Full Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email Address is required'],
            unique: true
        },
        companyName: {
            type: String,
            required: [true, 'Company/Business Name is required']
        },
        country: {
            type: String,
            required: [true, 'Country is required']
        },
        registrationNumber: {
            type: String,
            required: [true, 'Company/Business Registration Number is required']
        },
        mobileNumber: {
            type: String,
            required: [true, 'Company/Business Mobile Number is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        confirmPassword: {
            type: String,
            required: [true, 'Confirm Password is required']
        },
        avatar: {
            type: String,
            default: "https://i.stack.imgur.com/34AD2.jpg", 
          },
        accountType: {
            type: String,
            required: [true, 'Account Type is required'],
            enum: ['Buyer', 'Supplier', 'Service Provider']
        },
        businessType: {
            type: String,
            required: [true, 'Company/Business Type is required'],
            enum: ['Sole Proprietor', 'Partnership', 'Company']
        },
        isCompanyVerified: {
            type: Boolean,
            default: false,
          },
         
        googleId: String,
        facebookId: String
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
