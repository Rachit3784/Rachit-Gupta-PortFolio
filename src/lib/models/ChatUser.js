// src/lib/models/ChatUser.js
import mongoose from 'mongoose';

const ChatUserSchema = new mongoose.Schema(
  {
    name:           { type: String, required: true, trim: true },
    email:          { type: String, required: true, unique: true, lowercase: true, trim: true },
    activeDeviceId: { type: String, default: null },
    notificationId: { type: String, default: null },
    lastActive:     { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const ChatUser =
  mongoose.models.ChatUser || mongoose.model('ChatUser', ChatUserSchema);

