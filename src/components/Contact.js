// components/Contact.js — SaaS Premium Redesign
"use client";
import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaInstagram, FaGithub, FaPhone } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

/* ── Contact Channel Config ──────────────────────────── */
const CHANNELS = [
  {
    name: 'WhatsApp',
    handle: '+91 8817998451',
    icon: FaWhatsapp,
    link: 'https://wa.me/918817998451',
    bg: '#25D366',
    desc: 'Quick chat or project brief',
  },
  {
    name: 'Email',
    handle: 'grachit736@gmail.com',
    icon: FaEnvelope,
    link: 'mailto:grachit736@gmail.com',
    bg: '#f97316',
    desc: 'Detailed project enquiries',
  },
  {
    name: 'LinkedIn',
    handle: 'rachit-gupta-099999261',
    icon: FaLinkedin,
    link: 'https://www.linkedin.com/in/rachit-gupta-099999261',
    bg: '#0A66C2',
    desc: 'Professional networking',
  },
  {
    name: 'GitHub',
    handle: 'Rachit3784',
    icon: FaGithub,
    link: 'https://github.com/Rachit3784',
    bg: '#24292f',
    desc: 'Browse open-source code',
  },
  {
    name: 'Instagram',
    handle: '@rac_hit384',
    icon: FaInstagram,
    link: 'https://www.instagram.com/rac_hit384/',
    bg: '#E1306C',
    desc: 'Creative work & updates',
  },
  {
    name: 'Call Me',
    handle: '+91 9009634404',
    icon: FaPhone,
    link: 'tel:+919009634404',
    bg: '#7C3AED',
    desc: 'Mon–Fri, 9AM–9PM IST',
  },
];

/* ── Contact Info rows ───────────────────────────────── */
const INFO_ROWS = [
  {
    icon: MapPin,
    title: 'Location',
    lines: ['Jabalpur, Madhya Pradesh', 'India · Open to Remote'],
  },
  {
    icon: Clock,
    title: 'Availability',
    lines: ['Mon – Fri : 8:00 AM – 10:00 PM IST', 'Weekends : Urgent matters only'],
  },
  {
    icon: FaEnvelope,
    title: 'Email',
    lines: ['grachit736@gmail.com'],
    link: 'mailto:grachit736@gmail.com',
  },
];

/* ── Contact Form ────────────────────────────────────── */
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [errMsg, setErrMsg] = useState('');
  const [focused, setFocused] = useState('');

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrMsg('Network error. Please check your connection.');
    } finally {
      setSubmitting(false);
      setTimeout(() => setStatus(null), 6000);
    }
  };

  const inputBase =
    'w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all duration-200 font-medium resize-none';

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {[
        { id: 'name',    label: 'Your Name',     type: 'text',  placeholder: 'John Doe'           },
        { id: 'email',   label: 'Email Address', type: 'email', placeholder: 'john@company.com'   },
      ].map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
            {field.label}
          </label>
          <input
            id={field.id}
            name={field.id}
            type={field.type}
            value={formData[field.id]}
            onChange={onChange}
            onFocus={() => setFocused(field.id)}
            onBlur={() => setFocused('')}
            required
            placeholder={field.placeholder}
            className={`${inputBase} ${
              focused === field.id
                ? 'border-orange-500 ring-2 ring-orange-500/20'
                : 'hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          />
        </div>
      ))}

      <div>
        <label htmlFor="message" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={onChange}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused('')}
          required
          rows={5}
          placeholder="Tell me about your project, idea, or opportunity..."
          className={`${inputBase} ${
            focused === 'message'
              ? 'border-orange-500 ring-2 ring-orange-500/20'
              : 'hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full saas-btn-primary justify-center !py-4 text-base"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </>
        ) : (
          <><Send size={17} /> Send Message</>
        )}
      </motion.button>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-400 text-sm font-semibold"
          >
            <CheckCircle size={18} className="flex-shrink-0" />
            Message sent successfully! I'll get back to you within 24 hours.
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-semibold"
          >
            <AlertCircle size={18} className="flex-shrink-0" />
            {errMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

/* ── Main Section ────────────────────────────────────── */
const Contact = () => (
  <section id="contact" className="py-24 bg-white dark:bg-[#0d0f1a]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="saas-section-badge mx-auto mb-4">Get In Touch</div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
          Let's Work <span className="gradient-orange">Together</span>
        </h2>
        <div className="h-1 w-16 bg-orange-500 mx-auto rounded-full mb-5" />
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
          Open for full-time roles, freelance projects, or direct collaboration with tech founders. 
          Pick your preferred channel below.
        </p>
      </motion.div>

      {/* ── Contact Channels Grid ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
      >
        {CHANNELS.map((ch, i) => {
          const Icon = ch.icon;
          return (
            <motion.a
              key={i}
              href={ch.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group relative flex flex-col items-center gap-3 p-5 bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-800 rounded-2xl
                hover:border-transparent hover:shadow-xl
                transition-all duration-300 overflow-hidden cursor-pointer text-center"
            >
              {/* Color fill on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: ch.bg }}
              />

              {/* Icon circle */}
              <div
                className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: ch.bg + '20', border: `2px solid ${ch.bg}40` }}
              >
                <Icon
                  className="text-xl transition-colors duration-300 group-hover:text-white"
                  style={{ color: ch.bg }}
                />
              </div>

              {/* Name */}
              <div className="relative z-10">
                <p className="text-sm font-black text-gray-900 dark:text-white group-hover:text-white transition-colors leading-tight">
                  {ch.name}
                </p>
                <p className="text-[10px] text-gray-400 group-hover:text-white/80 transition-colors mt-0.5 font-medium leading-tight">
                  {ch.desc}
                </p>
              </div>

              {/* Arrow */}
              <ArrowRight
                size={14}
                className="relative z-10 text-gray-300 group-hover:text-white transition-all duration-300 group-hover:translate-x-1"
              />
            </motion.a>
          );
        })}
      </motion.div>

      {/* ── Two-Column: Form + Info ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* Left: Contact Form (wider) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="lg:col-span-3 bg-[#f8f8f8] dark:bg-gray-900/60 rounded-2xl p-8 border border-gray-200 dark:border-gray-800"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Send a Message</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              I usually respond within <span className="text-orange-500 font-bold">24 hours</span>
            </p>
          </div>
          <ContactForm />
        </motion.div>

        {/* Right: Info cards */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="lg:col-span-2 flex flex-col gap-5 justify-start"
        >
          {/* Availability pill */}
          <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse flex-shrink-0" />
            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
              Currently available for new opportunities
            </p>
          </div>

          {/* Info rows */}
          {INFO_ROWS.map((row, i) => {
            const Icon = row.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-start gap-4 p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-orange-400 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-orange-50 dark:bg-orange-950/30 rounded-xl flex items-center justify-center flex-shrink-0 border border-orange-100 dark:border-orange-900/40 group-hover:bg-orange-500 transition-all duration-300">
                  <Icon size={18} className="text-orange-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                    {row.title}
                  </p>
                  {row.lines.map((line, j) => (
                    row.link
                      ? <a key={j} href={row.link} className="block text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors">{line}</a>
                      : <p key={j} className="text-sm font-semibold text-gray-700 dark:text-gray-300">{line}</p>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Resume download CTA */}
          <a
            href="/Resume.pdf"
            download
            className="saas-btn-primary justify-center w-full mt-2"
          >
            Download Resume ↓
          </a>
        </motion.div>
      </div>

    </div>
  </section>
);

export default Contact;