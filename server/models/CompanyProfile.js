import mongoose from 'mongoose';

const companyProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  companyName: { type: String, required: true },
  businessType: [{ type: String, enum: ['Online Shop/Store', 'Manufacturer/Factory', 'Trading Company', 'Distributor/Wholesaler', 'Retailer', 'Buying Office', 'Individual', 'Other', 'Service Provider'], required: true }],
  officialWebsite: { type: String },
  registeredAddress: {
    country: { type: String },
    state: { type: String },
    city: { type: String },
    street: { type: String },
  },
  operationalAddress: {
    country: { type: String },
    provinceState: { type: String },
    city: { type: String },
    street: { type: String },
  },
  yearEstablished: { type: Number },
  mainProducts: [{ type: String }],
  aboutUs: { type: String },
});

const CompanyProfile = mongoose.model('CompanyProfile', companyProfileSchema);

export default CompanyProfile;