import mongoose from 'mongoose';

const SubcategorySchema = new mongoose.Schema({
  names: [{
    type: String,
    required: true
  }],
  category: { // Change field name from 'categories' to 'category'
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
    required: true
  }
});

export default mongoose.model("Subcategory", SubcategorySchema);