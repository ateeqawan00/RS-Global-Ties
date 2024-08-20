import Joi from 'joi';
import { createError } from '../utils/createError.js';
import Chat from "../models/Chats.js"
import Messages from "../models/Messages.js"
import User from '../models/User.js';
import { uploadImages } from '../utils/cloudinaryConfig.js';
import { userSocketMap } from "../utils/GlobalMap.js";
import { init as initSocket } from "../utils/socket.js";
import {getIO}  from "../utils/socket.js"




export const fetchMessagesOfPerticularChat = async (req, res, next) => {
  try {
    const user1Id = req.user._id;
    const chatId = req.params.chatId;

    console.log("chatId", chatId);

    const messages = await Messages.find({
      chat: chatId,
    })
      .populate({
        path: "sender",
        select: "username phoneNumber",
      })
      .select("sender created updated content media");

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    next(error);
  }
};




export const sendMessage = async (req, res, next) => {
  console.log('Received Request Body:', req.body);

  const { content, receiver, mediaType } = req.body;
  const mediaFile = req.file;

  console.log(mediaFile)

  if (!receiver) {
    return res.status(400).send('Receiver ID is required');
  }

  if (mediaFile && !mediaType) {
    return res.status(400).send('Media type is required when sending media');
  }

  if (mediaFile && mediaFile.size > 15 * 1024 * 1024) {
    return res.status(400).send('Media file size exceeds the maximum allowed (15MB)');
  }

  try {
    const senderUser = await User.findById(req.user._id);
    const receiverUser = await User.findById(receiver);

    console.log("receiverUser",receiverUser)

    if (!senderUser || !receiverUser) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    let chat = await Chat.findOneAndUpdate(
      {
        isGroupChat: false,
        users: { $all: [req.user._id, receiver] },
      },
      {},
      { upsert: true, new: true }
    );

    const newMessageData = {
      sender: req.user._id,
      receiver: receiver,
      content: content,
      chat: chat._id,
      media: {},
      deliveryStatus: 'sent',
      chatType: chat.isGroupChat ? 'group' : 'one-to-one',
    };

    if (mediaFile) {
      const mediaUrls = await uploadImages([mediaFile]);

      newMessageData.media = {
        type: mediaType || 'file', // Default media type to 'file' if not provided
        url: mediaUrls[0].url,
      };
    }

    const createdMessage = await Messages.create(newMessageData);

    createdMessage.deliveryStatus = 'sent';
    await createdMessage.save();

    const formattedCreatedAt = createdMessage.createdAt.toISOString();
    const formattedUpdatedAt = createdMessage.updatedAt.toISOString();
    const io = getIO();

    const receiverSocketIds = userSocketMap.get(receiver);

    console.log('Receiver:', receiver);
    console.log('Receiver Socket IDs:', receiverSocketIds);

    receiverSocketIds?.forEach((socketId) => {
      console.log('Emitting to Socket ID:', socketId);
      io.to(socketId).emit('new-message', createdMessage);
    });

    return res.json({
      message: {
        _id: createdMessage._id,
        content: createdMessage.content,
        media: createdMessage.media,
        sender: {
          _id: senderUser._id,
          username: senderUser.fullName,
          avatar: senderUser.avatar,
        },
        chat: {
          _id: chat._id,
          users: [senderUser, receiverUser].map((user) => ({
            _id: user._id,
            phoneNumber: user.phoneNumber,
            username: user.username,
          })),
          isGroupChat: false,
          createdAt: formattedCreatedAt,
          updatedAt: formattedUpdatedAt,
        },
        deliveryStatus: createdMessage.deliveryStatus,
        chatType: createdMessage.chatType,
      },
    });
  } catch (error) {
    console.error('Error while sending a message:', error);
    if (!res.headersSent) {
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
};

  


export const deleteMessage = async (req, res, next) => {
  const messageId = req.params.messageId; 

  try {
   
    const deletedMessage = await Messages.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    const io = getIO();
    io.emit('message-deleted', { messageId });

    return res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error while deleting message:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};





export const deleteAllMessages = async (req, res, next) => {
  const { sender, receiver } = req.body;

  try {
    const result = await Messages.deleteMany({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender }
      ]
    });

    if (result.deletedCount > 0) {
    
      const io = getIO();

      
      io.emit('deleteAllMessages', { sender, receiver });
    }

    return res.json({ status: 'success', message: 'Messages deleted successfully', deletedCount: result.deletedCount });
  } catch (error) {
    console.error('Error while deleting messages:', error);
    return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};