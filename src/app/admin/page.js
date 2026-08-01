// src/app/admin/page.js
"use client";
import React from 'react';

export default function AdminPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-center min-h-screen flex flex-col items-center justify-center">
      <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl text-white">
        <h1 className="text-3xl font-bold mb-4">Telegram Bot Notification System Active</h1>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Contact messages are no longer stored in MongoDB. All portfolio contact submissions are delivered instantly to your configured Telegram group via Telegram Bot.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-lg font-semibold text-sm">
          <span>📱 Check your Telegram Group for new messages</span>
        </div>
      </div>
    </div>
  );
}