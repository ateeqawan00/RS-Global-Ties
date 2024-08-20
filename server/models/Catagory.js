import mongoose from 'mongoose';

const catagorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

});

export default mongoose.model("Catagory", catagorySchema);