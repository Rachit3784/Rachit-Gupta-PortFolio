"use client";
// src/components/chat/AuthCard.js
// Glass card with email → (new user: animate name field) → proceed
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, Mail, User, MessageCircle } from 'lucide-react';

export const getDeviceId = () => {
  if (typeof window === 'undefined') return 'server_side';
  let devId = localStorage.getItem('rachit_device_id');
  if (!devId) {
    devId = 'dev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('rachit_device_id', devId);
  }
  return devId;
};

const AuthCard = ({ onAuthenticated }) => {
  const [email,       setEmail]       = useState('');
  const [name,        setName]        = useState('');
  const [step,        setStep]        = useState('email'); // 'email' | 'name'
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const nameRef = useRef(null);

  /* ── Validate email ── */
  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  /* ── Step 1: Check email ── */
  const handleEmailSubmit = async (e) => {
    e?.preventDefault();
    if (!isValidEmail(email)) { setError('Please enter a valid email address'); return; }
    setError('');
    setLoading(true);

    // Request notification permission on login attempt
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      try { await Notification.requestPermission(); } catch {}
    }

    const deviceId = getDeviceId();
    const notificationId = `notif_${deviceId}`;

    try {
      const res  = await fetch('/api/auth/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, deviceId, notificationId }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong'); return; }

      if (data.exists) {
        onAuthenticated(data.user);
      } else {
        // Slide down name field
        setStep('name');
        setTimeout(() => nameRef.current?.focus(), 300);
      }
    } catch {
      setError('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Step 2: Create user ── */
  const handleNameSubmit = async (e) => {
    e?.preventDefault();
    if (name.trim().length < 2) { setError('Please enter your full name'); return; }
    setError('');
    setLoading(true);

    const deviceId = getDeviceId();
    const notificationId = `notif_${deviceId}`;

    try {
      const res  = await fetch('/api/auth/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name.trim(), create: true, deviceId, notificationId }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong'); return; }
      onAuthenticated(data.user);
    } catch {
      setError('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#030303]">

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-orange-500/40 via-orange-400/10 to-transparent">
          <div className="w-full h-full rounded-3xl bg-[#030303]" />
        </div>

        <div className="relative z-10 p-8 sm:p-10 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/50">

          {/* Logo / Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
              className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30"
            >
              <MessageCircle size={26} className="text-white" />
            </motion.div>
            <h1 className="text-2xl font-display font-bold text-white tracking-tight">
              Let's Chat
            </h1>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Enter your email to identify yourself.<br />
              I'll reply directly in this window.
            </p>
          </div>

          <form onSubmit={step === 'email' ? handleEmailSubmit : handleNameSubmit} className="space-y-4">

            {/* Email field */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Mail size={16} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && step === 'email' && handleEmailSubmit()}
                disabled={step === 'name' || loading}
                placeholder="your@email.com"
                required
                className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 font-medium ${
                  step === 'name'
                    ? 'border-orange-500/40 bg-orange-500/5 text-orange-300/70 cursor-not-allowed'
                    : 'border-white/10 focus:border-orange-500/60 focus:bg-white/8 hover:border-white/20'
                }`}
              />
              {/* Arrow button — only visible in email step */}
              {step === 'email' && (
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-md shadow-orange-500/30 cursor-pointer"
                >
                  {loading ? <Loader2 size={16} className="text-white animate-spin" /> : <ArrowRight size={16} className="text-white" />}
                </button>
              )}
            </div>

            {/* Name field — slides down from behind email */}
            <AnimatePresence>
              {step === 'name' && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scaleY: 0.8 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{   opacity: 0, y: -20, scaleY: 0.8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'top' }}
                >
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      <User size={16} />
                    </div>
                    <input
                      ref={nameRef}
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setError(''); }}
                      placeholder="Your full name"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-orange-500/60 text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 font-medium"
                    />
                  </div>

                  {/* Info note */}
                  <p className="text-xs text-gray-500 px-1 mt-2">
                    👤 This helps me know who I'm chatting with.
                  </p>

                  {/* Proceed button */}
                  <motion.button
                    type="submit"
                    disabled={loading || name.trim().length < 2}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-3 w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                  >
                    {loading ? (
                      <><Loader2 size={16} className="animate-spin" /> Creating session...</>
                    ) : (
                      <>Start Chatting <ArrowRight size={15} /></>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-red-400 font-medium text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          {/* Footer note */}
          <p className="text-center text-[11px] text-gray-600 mt-8 leading-relaxed">
            🔒 Your data is secure. No spam, ever.<br />
            Replies appear here in real-time.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthCard;
