"use client";
// src/components/chat/MessageBubble.js
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ImageIcon, Download, Check, CheckCheck } from 'lucide-react';

const formatTime = (ts) =>
  new Date(ts).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

const MessageBubble = ({ message, isFirst = false }) => {
  const isUser  = message.role === 'user';
  const isAdmin = message.role === 'admin';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar (admin only) */}
      {isAdmin && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-[10px] font-bold mb-1">
          R
        </div>
      )}

      {/* Bubble */}
      <div className={`max-w-[75%] sm:max-w-[65%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Sender label (first message in a group) */}
        {isFirst && isAdmin && (
          <span className="text-[10px] text-orange-400 font-semibold mb-1 px-1">Rachit Gupta</span>
        )}

        <div
          className={`rounded-2xl overflow-hidden ${
            isUser
              ? 'bg-gradient-to-br from-orange-500 to-orange-600 rounded-br-sm shadow-lg shadow-orange-500/20'
              : 'bg-white/[0.07] backdrop-blur-md border border-white/[0.1] rounded-bl-sm shadow-sm'
          }`}
        >
          {/* Image */}
          {message.type === 'image' && message.content && (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={message.content}
                alt={message.fileName || 'Image'}
                className="max-w-full max-h-64 object-contain block"
                loading="lazy"
              />
            </div>
          )}
          {/* Image placeholder (file sent but no URL stored — base64 not stored in MongoDB) */}
          {message.type === 'image' && !message.content && (
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <ImageIcon size={18} className={isUser ? 'text-white/80' : 'text-orange-400'} />
              </div>
              <div className="min-w-0">
                <p className={`text-sm font-semibold truncate ${isUser ? 'text-white' : 'text-gray-200'}`}>
                  {message.fileName || 'Image'}
                </p>
                <p className={`text-[10px] ${isUser ? 'text-white/60' : 'text-gray-500'}`}>
                  {message.fileSize ? `${(message.fileSize / 1024 / 1024).toFixed(2)} MB` : 'Image sent'}
                </p>
              </div>
            </div>
          )}

          {/* PDF */}
          {message.type === 'pdf' && (
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <FileText size={18} className="text-red-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold truncate ${isUser ? 'text-white' : 'text-gray-200'}`}>
                  {message.fileName || 'Document.pdf'}
                </p>
                <p className={`text-[10px] ${isUser ? 'text-white/60' : 'text-gray-500'}`}>
                  {message.fileSize ? `${(message.fileSize / 1024 / 1024).toFixed(2)} MB · PDF` : 'PDF Document'}
                </p>
              </div>
              {message.content && (
                <a href={message.content} download target="_blank" rel="noopener noreferrer"
                  className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Download size={13} className={isUser ? 'text-white' : 'text-gray-300'} />
                </a>
              )}
            </div>
          )}

          {/* Text / caption */}
          {(message.type === 'text' || message.content) && message.type !== 'pdf' && message.type !== 'image' && (
            <div className={`px-4 py-2.5 ${message.type === 'image' ? 'pt-2' : ''}`}>
              <p className={`text-sm leading-relaxed break-words ${isUser ? 'text-white' : 'text-gray-100'}`}>
                {message.content}
              </p>
            </div>
          )}

          {/* Caption below media */}
          {(message.type === 'image' || message.type === 'pdf') && message.content && (
            <div className="px-4 pb-2 pt-1">
              <p className={`text-xs leading-relaxed break-words ${isUser ? 'text-white/80' : 'text-gray-300'}`}>
                {message.content}
              </p>
            </div>
          )}
        </div>

        {/* Timestamp + read indicator */}
        <div className={`flex items-center gap-1 mt-1 px-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-[10px] text-gray-600">{formatTime(message.createdAt)}</span>
          {isUser && (
            <CheckCheck size={11} className="text-orange-400" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
