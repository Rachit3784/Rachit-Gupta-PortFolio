'use client';
// src/components/FloatingActionButton.js — macOS Glass AI Assistant Window
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, Zap, Minimize2, Maximize2, RotateCcw } from 'lucide-react';

const AI_CHIPS = [
  { label: '⚡ Next.js 16',     prompt: "What are Rachit's Next.js 16 and App Router skills?" },
  { label: '📱 React Native',   prompt: "Tell me about Rachit's React Native mobile development skills." },
  { label: '💼 Work & CGPA',    prompt: "What is Rachit's education background, CGPA, and experience?" },
  { label: '🎬 Top Projects',   prompt: "What are Rachit's top projects?" },
  { label: '📞 Contact / Hire', prompt: "How can I contact or hire Rachit Gupta?" },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'bot',
    text: "👋 Hi! I'm Rachit's AI Portfolio Assistant. Ask me anything about his technical stack, projects, internships, or how to hire him!",
  },
];

const FloatingActionButton = () => {
  const [isOpen, setIsOpen]           = useState(false);
  const [isFullscreen, setFullscreen] = useState(false);
  const [messages, setMessages]       = useState(INITIAL_MESSAGES);
  const [input, setInput]             = useState('');
  const [loading, setLoading]         = useState(false);

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg = { id: Date.now(), role: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/botreply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, sessionId: 'rachit_ai_modal' }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          text: data.reply || "Rachit Gupta is a Full-Stack Engineer specializing in Next.js 16, React Native, Node.js, and MongoDB Atlas.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: 'bot',
          text: "Feel free to contact Rachit directly at grachit736@gmail.com or via the Live Chat on /contact page!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Floating Bot Button ── */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 border border-orange-400/40 text-white flex items-center justify-center shadow-2xl shadow-orange-500/40 cursor-pointer"
        title="Open AI Assistant"
      >
        <Bot size={26} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#030303] animate-pulse" />
      </motion.button>

      {/* ── macOS Glassmorphism AI Assistant Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed z-50 flex flex-col overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black/90 transition-all duration-300 ${
              isFullscreen
                ? 'inset-4 max-w-none max-h-none'
                : 'bottom-6 right-6 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh]'
            }`}
          >
            {/* macOS Titlebar */}
            <div className="flex-shrink-0 px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80 transition-opacity cursor-pointer" />
                <button onClick={() => setMessages(INITIAL_MESSAGES)} className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 transition-opacity cursor-pointer" title="Reset Chat" />
                <button onClick={() => setFullscreen(!isFullscreen)} className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 transition-opacity cursor-pointer" />
                <span className="text-xs font-bold text-white ml-2 flex items-center gap-1 font-display">
                  <Sparkles size={13} className="text-orange-400" /> AI Portfolio Assistant
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFullscreen(!isFullscreen)}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex-shrink-0 p-3 bg-white/[0.02] border-b border-white/5 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              <div className="flex gap-1.5 min-w-max">
                {AI_CHIPS.map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(chip.prompt)}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-xl bg-white/5 hover:bg-orange-500/20 text-gray-300 hover:text-orange-400 border border-white/10 hover:border-orange-500/30 transition-all cursor-pointer"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 relative z-10">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 flex-shrink-0 mr-2 mt-0.5">
                      <Bot size={14} />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed break-words ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white font-medium rounded-tr-sm shadow-md'
                        : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-2xl w-fit text-xs text-gray-400">
                  <Sparkles size={13} className="text-orange-400 animate-spin" />
                  Thinking...
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex-shrink-0 p-3 bg-white/[0.03] border-t border-white/10 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects, hiring..."
                disabled={loading}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/40 text-xs text-white placeholder-gray-500 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingActionButton;