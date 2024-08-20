

import mongoose from 'mongoose'


const carouselSchema = new mongoose.Schema({
    imageUrl: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: '',
    },
  });



  export default mongoose.model("caurosal",carouselSchema)

