import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
  expiryDate: {
    type: Date,

  },
  planStartDate: {
    type: Date,
  
  },
  planKey:String,
  plan:String,
  planId:String,

  planEndDate: {
    type: Date,
  },
  planDuration: {
    type: Number,
   
  },
  sessionId: {
    type: String,
    unique: true,
  },
});

export default mongoose.model('Subscription', subscriptionSchema);
