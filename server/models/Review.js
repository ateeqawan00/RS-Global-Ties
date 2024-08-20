import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  content: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value for rating.',
    },
  },
  starRating: Number, 
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullName: String, // Include user's full name
  country: String, // Include user's country
  accountType: String, // Include user's account type
  createdAt: {
    type: Date,
    default: Date.now, // Set default value to current date
  },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
