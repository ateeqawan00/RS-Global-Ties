// import Chat from '../models/Chat.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import Chat from "../models/Chats.js"
import Messages from "../models/Messages.js"
import User from '../models/User.js';



export const createChat = async (req, res, next) => {
  try {
    const { receiverId, message, yourName, phoneNumber, country, companyName } = req.body;

    
    const schema = Joi.object({
      receiverId: Joi.string().required(),
      message: Joi.string(),
      yourName: Joi.string(),
      phoneNumber: Joi.string(),
      country: Joi.string(),
      companyName: Joi.string(),
    });

    const { error } = schema.validate({
      receiverId,
      message,
      yourName,
      phoneNumber,
      country,
      companyName,
    });

    if (error) {
      throw createError(400, error.details[0].message);
    }

 
    const existingChat = await Chat.findOne({
      isGroupChat: false,
      users: {
        $all: [req.user._id, receiverId],
        $size: 2 
      }
    }).sort({ createdAt: -1 }); 

    let chatToUse;
    if (existingChat) {
      chatToUse = existingChat;
    } else {
      const chatData = {
        isGroupChat: false,
        users: [req.user._id, receiverId],
        companyName,
        yourName,
        phoneNumber,
        country,
      };
      chatToUse = await Chat.create(chatData);
    }

    // Fetch sender and receiver details
    const [senderUser, receiverUser] = await Promise.all([
      User.findById(req.user._id).select('fullName mobileNumber avatar accountType'),
      User.findById(receiverId).select('fullName mobileNumber avatar accountType'),
    ]);

    const newMessage = await Messages.create({
      sender: req.user._id,
      chat: chatToUse._id,
      receiver: receiverId,
      content: message,
    });


    await chatToUse.populate('users', 'fullName fullName avatar accountType');

  
    const chatResponse = {
      _id: chatToUse._id,
      users: chatToUse.users.map(user => ({
        _id: user._id,
        username: user.fullName,
        phoneNumber: user.mobileNumber,
        accountType: user.accountType,
      })),
      chatName: chatToUse.chatName,
      latestMessage: {
        _id: newMessage._id,
        sender: {
          _id: senderUser._id,
          username: senderUser.fullName,
          phoneNumber: senderUser.mobileNumber,
          avatar: senderUser.avatar,
        },
        content: newMessage.content,
        createdAt: newMessage.createdAt,
      },
    };

    res.status(200).json({
      chat: chatResponse,
      chatExists: existingChat !== null,
    });

  } catch (error) {
    console.error('Error in createChat:', error);
    next(error);
  }
};


 



export const fetchChat = async (req, res, next) => {
  try {
    const loggedUserId = req.user._id;

    const oneToOneChats = await Chat.find({
      users: loggedUserId,
      isGroupChat: false,
    })
      .populate({
        path: 'users',
        select: 'fullName phoneNumber',
      })
      .sort({ updatedAt: -1 })
      .lean();

    for (const chat of oneToOneChats) {
      const latestMessage = await Messages.findOne({
        chat: chat._id,
      })
        .sort({ createdAt: -1 })
        .select('content type createdAt');

      chat.latestMessage = latestMessage;

      // Remove the logged-in user from the array of users
      chat.users = chat.users.filter(user => user._id.toString() !== loggedUserId.toString());

      delete chat.isGroupChat;
      delete chat.companyName;
      delete chat.yourName;
      delete chat.phoneNumber;
      delete chat.country;
    }

    const filteredChats = oneToOneChats.map((chat) => {
      const {
        isGroupAdmin,
        isSuperAdmin,
        chatName,
        GroupAvatar,
        latestMessages,
        ...chatWithoutAdminFields
      } = chat;
      return chatWithoutAdminFields;
    });

    res.status(200).send(filteredChats);

  } catch (error) {
    console.error(error);
    next(error);
  }
};