

import mongoose from 'mongoose';

const SuccessStoriesSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  jobName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

export default mongoose.model("SuccessStories", SuccessStoriesSchema);