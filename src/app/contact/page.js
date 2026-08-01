"use client";
// src/app/contact/page.js — Ultra Premium macOS / iOS Glassmorphism Contact & WebRTC Call Route
import React, { useState, useEffect } from 'react';
import AuthCard   from '@/components/chat/AuthCard';
import ChatWindow from '@/components/chat/ChatWindow';
import { Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto restore session on mount from HTTP-only JWT cookie
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch('/api/chat/history');
        const data = await res.json();
        if (res.ok && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error('Session restore error', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAuthenticated = (userData) => {
    setUser(userData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="text-orange-500 animate-spin" />
        <span className="text-sm text-gray-500 font-medium">Restoring session...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#030303]">
        <AuthCard onAuthenticated={handleAuthenticated} />
      </main>
    );
  }

  return (
    <main className="h-screen w-screen bg-[#030303] flex overflow-hidden">
      <div className="w-full h-full flex-1">
        <ChatWindow user={user} />
      </div>
    </main>
  );
}
