// src/lib/models/ChatMessage.js
import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatUser',
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
    },
    type: {
      type: String,
      enum: ['text', 'image', 'pdf'],
      default: 'text',
    },
    content: {
      type: String,
      default: '',
    },
    fileName: {
      type: String,
      default: null,
    },
    fileSize: {
      type: Number,
      default: null,
    },
    // Telegram's message_id returned when we send to Telegram.
    // Used to map admin replies back to the right user.
    telegramMessageId: {
      type: Number,
      default: null,
      index: true,
    },
    // For admin messages: text of the reply
    adminReply: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const ChatMessage =
  mongoose.models.ChatMessage || mongoose.model('ChatMessage', ChatMessageSchema);
