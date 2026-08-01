"use client";
// src/components/chat/ChatWindow.js
// macOS / Telegram style glass chat window with WebRTC Video Call & Socket.io real-time events.
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, X, Loader2, ImageIcon, FileText, MessageSquare } from 'lucide-react';
import ChatHeader     from './ChatHeader';
import MessageBubble  from './MessageBubble';
import VideoCallModal from './VideoCallModal';
import { socket }     from '@/lib/socket';

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

const ChatWindow = ({ user }) => {
  const [messages,       setMessages]       = useState([]);
  const [inputText,      setInputText]      = useState('');
  const [selectedFile,    setSelectedFile]   = useState(null);
  const [sending,        setSending]        = useState(false);
  const [loadingHist,    setLoadingHist]    = useState(true);
  const [fileError,      setFileError]      = useState('');
  const [lastPollTs,     setLastPollTs]     = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [incomingSignal, setIncomingSignal] = useState(null);

  const bottomRef  = useRef(null);
  const fileRef    = useRef(null);
  const pollRef    = useRef(null);
  const inputRef   = useRef(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const lastPollRef = useRef(lastPollTs);
  useEffect(() => {
    lastPollRef.current = lastPollTs;
  }, [lastPollTs]);

  /* ── Socket.io Connection & Events ── */
  useEffect(() => {
    if (!user) return;

    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }

    socket.connect();
    socket.emit('join_room', { userId: user.id });

    // Live admin reply via Socket.io
    socket.on('admin_reply', (msg) => {
      setMessages((prev) => {
        if (prev.some((m) => m._id?.toString() === msg._id?.toString())) return prev;
        const updated = [...prev, msg];
        setTimeout(scrollToBottom, 100);
        return updated;
      });
    });

    // Incoming WebRTC Video Call
    socket.on('incoming_call', ({ signal, from, name }) => {
      setIsIncomingCall(true);
      setIncomingSignal(signal);
      setVideoModalOpen(true);

      // Trigger OS/Browser Native Notification
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('📹 Incoming WebRTC Video Call', {
          body: 'Rachit Gupta (Super Admin) is calling you on WebRTC Video Meeting...',
          icon: '/favicon.ico',
        });
      }
    });

    return () => {
      socket.off('admin_reply');
      socket.off('incoming_call');
      socket.disconnect();
    };
  }, [user, scrollToBottom]);

  /* ── Load history ── */
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch('/api/chat/history');
        const data = await res.json();
        if (res.ok) {
          setMessages(data.messages || []);
          if (data.messages?.length) {
            const last = data.messages[data.messages.length - 1];
            setLastPollTs(last.createdAt);
            lastPollRef.current = last.createdAt;
          }
        }
      } catch (err) {
        console.error('History load error', err);
      } finally {
        setLoadingHist(false);
        setTimeout(scrollToBottom, 100);
      }
    })();
  }, [scrollToBottom]);

  /* ── Fallback Polling for admin replies (every 3 seconds) ── */
  useEffect(() => {
    const poll = async () => {
      try {
        const currentTs = lastPollRef.current;
        const url = `/api/chat/poll${currentTs ? `?after=${encodeURIComponent(currentTs)}` : ''}`;
        const res  = await fetch(url);
        const data = await res.json();
        if (res.ok && data.messages?.length) {
          setMessages((prev) => {
            const existingIds = new Set(prev.map((m) => m._id?.toString()));
            const newOnes = data.messages.filter((m) => !existingIds.has(m._id?.toString()));
            if (!newOnes.length) return prev;
            const updated = [...prev, ...newOnes];
            const newLastTs = updated[updated.length - 1].createdAt;
            setLastPollTs(newLastTs);
            lastPollRef.current = newLastTs;
            setTimeout(scrollToBottom, 100);
            return updated;
          });
        }
      } catch { /* silent */ }
    };

    pollRef.current = setInterval(poll, 3000);
    return () => clearInterval(pollRef.current);
  }, [scrollToBottom]);

  /* ── File picker ── */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileError('');

    if (file.size > MAX_BYTES) {
      setFileError('File exceeds 10MB limit');
      e.target.value = '';
      return;
    }
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      setFileError('Only images and PDFs are allowed');
      e.target.value = '';
      return;
    }

    const isImage = file.type.startsWith('image/');
    const preview = isImage ? URL.createObjectURL(file) : null;
    setSelectedFile({ file, preview, type: isImage ? 'image' : 'pdf', name: file.name, size: file.size });
  };

  const removeFile = () => {
    if (selectedFile?.preview) URL.revokeObjectURL(selectedFile.preview);
    setSelectedFile(null);
    setFileError('');
    if (fileRef.current) fileRef.current.value = '';
  };

  /* ── Send message (Instant Optimistic Update — 0ms delay) ── */
  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputText.trim() && !selectedFile) return;

    const content = inputText.trim();
    const fileObj = selectedFile;

    // 1. Create optimistic message immediately
    const optimisticMsg = {
      _id: 'temp_' + Date.now(),
      role: 'user',
      type: fileObj ? (fileObj.type === 'image' ? 'image' : 'pdf') : 'text',
      content: content,
      fileName: fileObj ? fileObj.name : null,
      fileSize: fileObj ? fileObj.size : null,
      createdAt: new Date().toISOString(),
    };

    // 2. Instant UI update (0ms delay!)
    setMessages((prev) => [...prev, optimisticMsg]);
    setInputText('');
    removeFile();
    setTimeout(scrollToBottom, 50);
    inputRef.current?.focus();

    // 3. Instant Socket.io broadcast to Super Admin Portal
    socket.emit('user_send_message', { userId: user.id, message: optimisticMsg });

    // 4. Background persistence to MongoDB
    try {
      const fd = new FormData();
      if (content) fd.append('message', content);
      if (fileObj) fd.append('file', fileObj.file);

      const res  = await fetch('/api/chat/send', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok && data.message) {
        // Swap temp ID with MongoDB ID
        setMessages((prev) =>
          prev.map((m) => (m._id === optimisticMsg._id ? data.message : m))
        );
        lastPollRef.current = data.message.createdAt;
      }
    } catch (err) {
      console.error('Background send error', err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isFirstInGroup = (i) => {
    if (i === 0) return true;
    return messages[i].role !== messages[i - 1].role;
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#030303] relative overflow-hidden">

      {/* WebRTC Video Call Modal */}
      <VideoCallModal
        isOpen={videoModalOpen}
        onClose={() => { setVideoModalOpen(false); setIsIncomingCall(false); }}
        user={user}
        isIncoming={isIncomingCall}
        incomingSignal={incomingSignal}
      />

      {/* Header */}
      <ChatHeader
        user={user}
        onStartVideoCall={() => { setIsIncomingCall(false); setVideoModalOpen(true); }}
      />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-3 relative z-10 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
        <div className="max-w-4xl mx-auto space-y-3">

          {/* Loading history */}
          {loadingHist && (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 size={28} className="text-orange-500 animate-spin" />
              <span className="text-sm text-gray-500">Loading conversation...</span>
            </div>
          )}

          {/* Empty state */}
          {!loadingHist && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-4"
            >
              <div className="w-16 h-16 rounded-3xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <MessageSquare size={28} className="text-orange-500" />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold mb-1">Start the conversation!</p>
                <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                  Send a message or start a WebRTC video call. I'll reply directly in real-time.
                </p>
              </div>
            </motion.div>
          )}

          {/* Messages */}
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <MessageBubble key={msg._id || i} message={msg} isFirst={isFirstInGroup(i)} />
            ))}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 relative z-10 border-t border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl px-4 py-3">
        <div className="max-w-4xl mx-auto space-y-2">

          {/* File preview bar */}
          <AnimatePresence>
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10"
              >
                {selectedFile.type === 'image' && selectedFile.preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={selectedFile.preview} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <FileText size={20} className="text-red-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB · {selectedFile.type.toUpperCase()}</p>
                </div>
                <button onClick={removeFile} className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer">
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* File error */}
          <AnimatePresence>
            {fileError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-xs text-red-400 font-medium px-1"
              >
                ⚠ {fileError}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Input row */}
          <form onSubmit={handleSend} className="flex items-end gap-2">

            {/* Attachment button */}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={sending}
              className="flex-shrink-0 w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all cursor-pointer disabled:opacity-40"
              title="Attach image or PDF"
            >
              <Paperclip size={17} />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Text input */}
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                rows={1}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                disabled={sending}
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-orange-500/40 focus:bg-white/8 text-sm text-white placeholder-gray-500 outline-none transition-all resize-none leading-relaxed disabled:opacity-50 font-medium"
                style={{ maxHeight: '120px', overflowY: 'auto' }}
              />
            </div>

            {/* Send button */}
            <motion.button
              type="submit"
              disabled={sending || (!inputText.trim() && !selectedFile)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {sending
                ? <Loader2 size={17} className="animate-spin" />
                : <Send size={17} className="ml-0.5" />
              }
            </motion.button>
          </form>

          <p className="text-center text-[10px] text-gray-600">
            Press <kbd className="px-1 py-0.5 rounded bg-white/5 text-gray-500 text-[9px] font-mono">Enter</kbd> to send · <kbd className="px-1 py-0.5 rounded bg-white/5 text-gray-500 text-[9px] font-mono">Shift+Enter</kbd> for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
