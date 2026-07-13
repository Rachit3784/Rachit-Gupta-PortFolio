'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, MessageSquare, Trash2, ArrowLeft, Sparkles, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_MESSAGES = [
  {
    id: 1,
    text: "👋 Hello! I'm Rachit's AI Assistant — trained on his full technical portfolio.",
    sender: 'bot',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
  {
    id: 2,
    text: "I can answer questions about Next.js 16, React Native, TypeScript, MongoDB, his projects, internships, or how to hire him. What would you like to know?",
    sender: 'bot',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

const CHAT_CHIPS = [
  { label: '⚡ Next.js 16',        prompt: "What are Rachit's Next.js 16 App Router skills?" },
  { label: '📱 React Native',      prompt: "Tell me about Rachit's React Native mobile apps." },
  { label: '🎬 Movie Finder',       prompt: "Tell me about the Movie Finder project." },
  { label: '🛒 Grocery App',        prompt: "Tell me about the Grocery Delivery mobile app." },
  { label: '💼 Work Experience',    prompt: "What internship experience does Rachit have?" },
  { label: '🎓 Education',          prompt: "What is Rachit's education background and CGPA?" },
  { label: '📞 How to Hire',        prompt: "How can I contact or hire Rachit Gupta?" },
];

const ChatScreen = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load chat history
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rachit_portfolio_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch {}
    setMessages(DEFAULT_MESSAGES);
  }, []);

  // Persist history
  useEffect(() => {
    if (messages.length > 0) {
      try { localStorage.setItem('rachit_portfolio_chat_history', JSON.stringify(messages)); } catch {}
    }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const clearHistory = () => {
    try { localStorage.removeItem('rachit_portfolio_chat_history'); } catch {}
    setMessages(DEFAULT_MESSAGES);
  };

  const sendMessage = async (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    inputRef.current?.focus();

    try {
      const res = await fetch('/botreply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId: 'rachit_saas_visitor' }),
      });
      const data = await res.json();
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: data.reply || "Thank you! Rachit is a Full-Stack Engineer skilled in Next.js 16 and React Native.",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 2,
          text: "I couldn't reach the server right now. Feel free to email Rachit directly at grachit736@gmail.com.",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-[#0d0f1a]" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* Background subtle grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Main Container ─────────────────────────────── */}
      <div className="relative z-10 h-full max-w-3xl mx-auto w-full flex flex-col border-x border-white/5">

        {/* ── Header ───────────────────────────────────── */}
        <header className="flex-shrink-0 px-4 py-3 bg-[#111827]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/')}
              className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer border border-white/5"
              title="Back to Portfolio"
            >
              <ArrowLeft size={16} />
            </button>

            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#111827]" />
            </div>

            <div>
              <h1 className="text-sm font-black text-white tracking-tight leading-tight">
                Rachit's AI Assistant
              </h1>
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Zap size={9} className="fill-emerald-400" />
                Online · Full-Stack Knowledge Base
              </p>
            </div>
          </div>

          <button
            onClick={clearHistory}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-red-500/10 hover:border-red-500/30 text-gray-400 hover:text-red-400 rounded-xl transition-all text-xs font-semibold border border-white/5 cursor-pointer"
            title="Clear Chat History"
          >
            <Trash2 size={13} />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </header>

        {/* ── Quick Prompt Chips ────────────────────────── */}
        <div className="flex-shrink-0 px-4 py-2.5 border-b border-white/5 bg-[#0d0f1a]/60 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 min-w-max">
            {CHAT_CHIPS.map((chip, i) => (
              <button
                key={i}
                onClick={() => sendMessage(chip.prompt)}
                className="flex-shrink-0 px-3.5 py-1.5 text-[11px] font-bold rounded-lg
                  bg-white/5 hover:bg-orange-500/15
                  text-gray-400 hover:text-orange-400
                  border border-white/8 hover:border-orange-500/40
                  transition-all duration-200 cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Messages Area ─────────────────────────────── */}
        <main className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-8 h-8 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center flex-shrink-0 mr-2.5 mt-0.5">
                      <Bot size={14} className="text-orange-400" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
                      isBot
                        ? 'bg-[#1a1f2e] border border-white/8 text-gray-200 rounded-tl-sm'
                        : 'bg-orange-500 text-white rounded-tr-sm shadow-lg shadow-orange-500/20'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line break-words font-medium">
                      {msg.text}
                    </p>
                    <span className={`block text-[10px] mt-1.5 font-mono ${isBot ? 'text-gray-500' : 'text-orange-200'}`}>
                      {msg.timestamp}
                    </span>
                  </div>

                  {!isBot && (
                    <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0 ml-2.5 mt-0.5">
                      <User size={14} className="text-white" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                className="flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="text-orange-400" />
                </div>
                <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1f2e] border border-white/8 rounded-2xl rounded-tl-sm">
                  <span className="text-[11px] font-semibold text-gray-500">Thinking</span>
                  <div className="flex gap-1">
                    {[0, 0.15, 0.3].map((delay, i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"
                        style={{ animationDelay: `${delay}s` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </main>

        {/* ── Input Bar ─────────────────────────────────── */}
        <footer className="flex-shrink-0 p-4 bg-[#111827]/90 backdrop-blur-md border-t border-white/5">
          <div
            className="flex items-center gap-3 bg-[#1a1f2e] border border-white/8 rounded-2xl px-4 py-2.5
              focus-within:border-orange-500/50 focus-within:shadow-lg focus-within:shadow-orange-500/10
              transition-all duration-200"
          >
            <Sparkles size={15} className="text-orange-500/60 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about projects, skills, hiring..."
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none font-medium py-1"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer flex-shrink-0 ${
                input.trim() && !isTyping
                  ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/30 scale-100 hover:scale-105'
                  : 'bg-white/5 text-gray-600 cursor-not-allowed'
              }`}
            >
              <Send size={15} />
            </button>
          </div>
          <p className="text-center text-[10px] text-gray-600 font-medium mt-2">
            Powered by Rachit's AI · Full-Stack Knowledge Base
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ChatScreen;