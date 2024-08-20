import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email Address is required'],
        unique: true
    },
    avatar: {
        type: String,
        default: "https://i.stack.imgur.com/34AD2.jpg", 
      },
    password: String,
    country: {
        type: String,
        required: [true, 'Country is required']
    },
}, { timestamps: true });

export default mongoose.model("Admin", AdminSchema);