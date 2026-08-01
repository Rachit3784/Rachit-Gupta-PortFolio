"use client";
// src/components/chat/ChatHeader.js — macOS Style Glass Header
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, AlertTriangle, ChevronLeft, Video } from 'lucide-react';
import Link from 'next/link';

const ChatHeader = ({ user, isOnline = true, onStartVideoCall }) => {
  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="flex-shrink-0 border-b border-white/10 bg-white/[0.04] backdrop-blur-2xl px-4 py-3.5 shadow-xl shadow-black/40 relative z-20">
      <div className="max-w-4xl mx-auto flex items-center gap-3">

        {/* Back to portfolio */}
        <Link
          href="/"
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
          title="Back to Portfolio"
        >
          <ChevronLeft size={18} />
        </Link>

        {/* Avatar with glowing ring */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-extrabold shadow-lg shadow-orange-500/30 border border-orange-400/40">
            {initials}
          </div>
          {isOnline && (
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#030303] shadow-sm" />
          )}
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white truncate leading-none mb-1 font-display">{user.name}</p>
          <p className="text-[11px] text-gray-400 truncate leading-none font-medium">{user.email}</p>
        </div>

        {/* WebRTC Video Call Button */}
        {onStartVideoCall && (
          <button
            onClick={onStartVideoCall}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-extrabold shadow-lg shadow-orange-500/25 transition-all cursor-pointer flex-shrink-0"
            title="Start WebRTC P2P Video Call"
          >
            <Video size={15} />
            <span className="hidden sm:inline">Video Call</span>
          </button>
        )}

        {/* Status badge */}
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest flex-shrink-0"
        >
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Live
        </motion.div>

      </div>

      {/* File limit warning note */}
      <div className="max-w-4xl mx-auto mt-2.5 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-medium backdrop-blur-md">
        <AlertTriangle size={13} className="flex-shrink-0 text-amber-400" />
        <span>📌 <strong>Max File Size: 10MB</strong> — Images &amp; PDFs allowed. Real-Time Socket.io &amp; WebRTC Active.</span>
      </div>
    </div>
  );
};

export default ChatHeader;
