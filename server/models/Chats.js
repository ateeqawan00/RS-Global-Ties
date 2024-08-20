

import mongoose from 'mongoose';


//new commits
const ChatSchema = new mongoose.Schema({
  conversationId: {
    type: String,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  chatName: {
    type: String,
    trim: true
  },
  senderId: {
    type: String,
  },
  latestMessages: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MessagesNew',
  },
  // Removed fields
  isGroupChat: {
    type: Boolean,
    default: false
  },
  isGroupAdmin: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  isSuperAdmin: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  // Added fields
  companyName: {
    type: String,
  },
  yourName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  country: {
    type: String,
  },
}, {
  timestamps: true
});


export default mongoose.model("Chat", ChatSchema);

