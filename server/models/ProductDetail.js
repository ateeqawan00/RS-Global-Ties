import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productCategory: { type: String, required: true },
  productSubcategory: [{ type: String }], // New field for product subcategory
  price: { type: Number, required: true },
  description: { type: String },
  productImages: [{ type: String }], 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  subscriptionPlan: {
    type: String, 
  },
}, {
  timestamps: true, 
});

const Product = mongoose.model('Product', productSchema);

export default Product;
