import mongoose from 'mongoose';

const requirementSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  name: { type: String, required: true },
  timeOfValidity: { type: Date, required: true },
  buyingFrequency: { type: String, required: true },
  quantityRequired: { type: Number, required: true },
  quantityUnit: { type: String, required: true },
  annualPurchasedVolume: { type: Number, required: true },
  volumeUnit: { type: String, required: true },
  description: { type: String },
  shipmentTerm: { type: String, required: true },
  destinationPort: { type: String, required: true },
  paymentType: { type: String, required: true },
  regionsLookingFor: { type: String, },
  regionsToAvoid: { type: String },
});

const Requirement = mongoose.model('Requirement', requirementSchema);

export default Requirement;