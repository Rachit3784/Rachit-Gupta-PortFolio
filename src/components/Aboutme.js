"use client";
import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import {
  SiReact, SiMongodb, SiNodedotjs, SiNextdotjs, SiTypescript,
  SiFirebase, SiExpress,
} from 'react-icons/si';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Trophy, GraduationCap, Code2, Heart, MapPin, Calendar, Star, ArrowUpRight } from 'lucide-react';

/* ── Role badges ── */
const ROLES = ['Next.js Developer', 'React Native Dev', 'Web Developer', 'App Developer', 'Full-Stack Engineer'];

/* ── Core tech stack ── */
const CORE_TECH = [
  { Icon: SiNextdotjs,  name: 'Next.js 16', color: '#fff',    bg: '#000'    },
  { Icon: SiReact,      name: 'React/RN',   color: '#61DAFB', bg: '#0d1117' },
  { Icon: SiNodedotjs, name: 'Node.js',    color: '#339933', bg: '#0d1f0d' },
  { Icon: SiMongodb,   name: 'MongoDB',    color: '#47A248', bg: '#0d1f0d' },
  { Icon: SiTypescript, name: 'TypeScript', color: '#fff',    bg: '#3178C6' },
  { Icon: SiFirebase,  name: 'Firebase',   color: '#FFCA28', bg: '#1a1a0a' },
];

/* ── Highlights ── */
const HIGHLIGHTS = [
  { icon: Trophy, title: 'Merit Scholarship', desc: '80% Tuition Fee Waiver (TFW) — Top Entrance-Exam Percentile' },
  { icon: GraduationCap, title: 'B.Tech CSE', desc: 'Gyan Ganga College of Technology, Jabalpur · CGPA: 7.53/10 · 2022-2026' },
  { icon: Code2, title: '2+ Years Coding', desc: 'Building & shipping real apps since 2022 across web and mobile.' },
  { icon: Heart, title: 'Passion-Driven', desc: 'Open source contributor · Always learning · Fueled by chai ☕' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const AboutMe = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-[#030303] relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-badge mx-auto mb-4">
            <Heart size={11} /> The Builder
          </div>
          <h2 className="section-heading text-gray-900 dark:text-white mb-4">
            About <span className="gradient-orange">Me</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full" />
        </motion.div>

        {/* ── Main 2-col layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">

          {/* Left: Profile column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex flex-col items-center gap-6"
          >
            {/* Profile image with animated ring */}
            <div className="relative">
              {/* Rotating ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-orange-300/30 dark:border-orange-500/20 animate-spin-slow scale-110" />
              {/* Glow */}
              <div className="absolute inset-4 rounded-full bg-orange-400/10 blur-2xl animate-glowPulse" />
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative w-52 h-52 rounded-full overflow-hidden z-10"
                style={{ boxShadow: '0 0 0 3px rgba(249,115,22,0.3), 0 0 0 7px rgba(249,115,22,0.1), 0 20px 60px rgba(0,0,0,0.25)' }}
              >
                <Image src="/Profile.jpg" alt="Rachit Gupta" fill className="object-cover" />
              </motion.div>
            </div>

            {/* Name & meta */}
            <div className="text-center">
              <h3 className="text-2xl font-display font-extrabold text-gray-900 dark:text-white">
                Rachit Gupta
              </h3>
              <p className="text-orange-500 font-semibold text-sm mt-1">Full-Stack Engineer · 2026 Batch</p>
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-400 font-medium">
                <span className="flex items-center gap-1"><MapPin size={11} /> Jabalpur, India</span>
                <span className="flex items-center gap-1"><Calendar size={11} /> 2022–2026</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="btn-primary justify-center"
              >
                Get in Touch
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="/Resume.pdf"
                download
                className="btn-ghost justify-center"
              >
                Download Resume ↓
              </motion.a>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { href: 'https://www.linkedin.com/in/rachit-gupta-099999261', Icon: FaLinkedin, color: 'hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10' },
                { href: 'https://github.com/Rachit3784', Icon: FaGithub, color: 'hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10' },
                { href: 'https://www.instagram.com/rac_hit384/', Icon: FaInstagram, color: 'hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-500/10' },
              ].map(({ href, Icon, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 transition-all border border-gray-200 dark:border-white/5 ${color}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Bio text */}
            <motion.div variants={itemVariants} className="bento-card p-7">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 leading-relaxed mb-3">
                I'm a <span className="text-gray-900 dark:text-white font-extrabold">Full-Stack Engineer (2026 Batch)</span> specializing in{' '}
                <span className="text-orange-500 font-extrabold">Next.js 16</span>,{' '}
                <span className="font-extrabold text-gray-900 dark:text-white">React Native</span>, and{' '}
                <span className="font-extrabold text-gray-900 dark:text-white">Node.js</span>.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Currently pursuing B.Tech in Computer Science at{' '}
                <strong className="text-gray-700 dark:text-gray-200">Gyan Ganga College of Technology, Jabalpur</strong>{' '}
                (CGPA: <strong className="text-orange-500">7.53/10</strong>). I build production-grade web and mobile apps,
                architect clean REST APIs, and ship scalable features from day one.
              </p>
            </motion.div>

            {/* Role badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {ROLES.map((role, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold rounded-xl border border-orange-100 dark:border-orange-500/20"
                >
                  <Star size={9} className="fill-orange-500 text-orange-500" /> {role}
                </motion.span>
              ))}
            </motion.div>

            {/* Core tech stack */}
            <motion.div variants={itemVariants} className="bento-card p-6">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500 mb-4">
                Core Engineering Stack
              </p>
              <div className="grid grid-cols-3 gap-3">
                {CORE_TECH.map(({ Icon, name, color, bg }, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-orange-400/30 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                      <Icon style={{ color, fontSize: '16px' }} />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-tight">{name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Extra skills mention */}
            <motion.div variants={itemVariants} className="bento-card p-5">
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Also experienced with{' '}
                {['TypeScript', 'Zustand', 'Redux', 'WebRTC', 'Firebase', 'Razorpay', 'JWT Auth', 'Vercel', 'AsyncStorage', 'Expo-AV'].map((t, i) => (
                  <strong key={i} className="text-gray-700 dark:text-gray-200 font-semibold">{t}{i < 9 ? ', ' : '.'}</strong>
                ))}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Highlights grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HIGHLIGHTS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="bento-card p-6 group"
            >
              <div className="w-10 h-10 bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/15 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon size={18} className="text-orange-500" />
              </div>
              <h4 className="text-sm font-display font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">{title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
