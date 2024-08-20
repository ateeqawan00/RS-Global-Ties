import mongoose from 'mongoose';


const MessagesSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  media: {
    type: {
      type: String,
      enum: ['image', 'video', 'audio', 'file','none', 'application'],
      default: 'none',
    },
    url: String,
  },
  content: {
    type: String,
    trim: true,
  },
  deliveryStatus: {
    type: String,
    enum: ["sent", "delivered", "read"],
    default: "sent",
  },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

export default mongoose.model("Messages", MessagesSchema);