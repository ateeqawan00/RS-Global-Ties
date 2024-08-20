
import mongoose from 'mongoose';

const ProductListSchema = new mongoose.Schema({
  category: String,
  subcategory: String,
  products: [
{
  type:String
}

  ], // Array of strings representing product names
});

export default mongoose.model("ProductList", ProductListSchema);