// components/Services.js — Bento Grid Skills + Animated Tech Stack
"use client";
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { services } from '../data/services';
import Image from 'next/image';
import {
  SiNextdotjs, SiReact, SiNodedotjs, SiMongodb, SiExpress,
  SiTypescript, SiJavascript, SiTailwindcss, SiRedux, SiFirebase,
  SiExpo, SiRazorpay, SiZustand, SiWebrtc, SiGit, SiVercel,
} from 'react-icons/si';
import { FaLaptopCode, FaMobileAlt, FaServer, FaCode } from 'react-icons/fa';
import { Sparkles, Zap, Globe, Smartphone, Server, ArrowUpRight } from 'lucide-react';

/* ── Tech Stack with Si icons ── */
const TECH_STACK = [
  { name: 'Next.js',    Icon: SiNextdotjs,   color: '#fff',    bg: '#000'    },
  { name: 'React',      Icon: SiReact,        color: '#61DAFB', bg: '#0d1117' },
  { name: 'React Native', Icon: SiReact,      color: '#61DAFB', bg: '#1a1a2e' },
  { name: 'Node.js',    Icon: SiNodedotjs,   color: '#339933', bg: '#0d1f0d' },
  { name: 'MongoDB',    Icon: SiMongodb,     color: '#47A248', bg: '#0d1f0d' },
  { name: 'Express',    Icon: SiExpress,     color: '#ccc',    bg: '#111'    },
  { name: 'TypeScript', Icon: SiTypescript,  color: '#fff',    bg: '#3178C6' },
  { name: 'JavaScript', Icon: SiJavascript,  color: '#000',    bg: '#F7DF1E' },
  { name: 'Tailwind',   Icon: SiTailwindcss, color: '#06B6D4', bg: '#0d2233' },
  { name: 'Redux',      Icon: SiRedux,       color: '#fff',    bg: '#764ABC' },
  { name: 'Firebase',   Icon: SiFirebase,    color: '#FFCA28', bg: '#1a1a0a' },
  { name: 'Expo',       Icon: SiExpo,        color: '#fff',    bg: '#000020' },
  { name: 'Git',        Icon: SiGit,         color: '#F05032', bg: '#1f0d0d' },
  { name: 'Vercel',     Icon: SiVercel,      color: '#fff',    bg: '#000'    },
];

/* ── Skill proficiency data ── */
const SKILLS = [
  { name: 'Next.js / React',    level: 90, color: '#f97316' },
  { name: 'React Native',       level: 88, color: '#61DAFB' },
  { name: 'Node.js / Express',  level: 82, color: '#339933' },
  { name: 'TypeScript',         level: 80, color: '#3178C6' },
  { name: 'MongoDB / NoSQL',    level: 78, color: '#47A248' },
  { name: 'REST API Design',    level: 85, color: '#f97316' },
];

/* ── Service categories ── */
const SERVICES_DATA = [
  {
    icon: Globe,
    title: 'Full-Stack Web',
    desc: 'Next.js 16 App Router, REST APIs, MongoDB, deployed on Vercel.',
    color: '#f97316',
    techs: ['Next.js 16', 'React.js', 'Node.js', 'MongoDB'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'Cross-platform React Native apps for iOS & Android.',
    color: '#61DAFB',
    techs: ['React Native', 'Expo', 'Zustand', 'JWT Auth'],
  },
  {
    icon: Server,
    title: 'Backend & APIs',
    desc: 'Scalable REST APIs with JWT auth, session management, and clean layered architecture.',
    color: '#339933',
    techs: ['Node.js', 'Express.js', 'MongoDB Atlas', 'JWT'],
  },
];

/* ── Skill progress bar ── */
const SkillBar = ({ name, level, color, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-xs font-bold" style={{ color }}>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: delay + 0.2 }}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        />
      </div>
    </div>
  );
};

/* ── Tech badge with hover glow ── */
const TechBadge = ({ item, i }) => {
  const { Icon, name, color, bg } = item;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.06 }}
      className="tech-badge"
      style={{ '--tech-color': color }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm"
        style={{ background: bg }}
      >
        <Icon style={{ color }} />
      </div>
      <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-400 text-center leading-tight px-1">{name}</span>
    </motion.div>
  );
};

/* ── Tech Marquee strip ── */
const TechMarquee = ({ items, reverse = false }) => {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden w-full py-2">
      <div className={`flex gap-4 w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {doubled.map((item, i) => {
          const { Icon, name, color, bg } = item;
          return (
            <div
              key={i}
              className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5
                bg-white dark:bg-white/5
                border border-gray-100 dark:border-white/5
                rounded-xl hover:border-orange-400/50 transition-all duration-300
                cursor-default group"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm group-hover:scale-110 transition-transform duration-200"
                style={{ background: bg }}
              >
                <Icon style={{ color }} />
              </div>
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Main Services Component ── */
const Services = () => {
  return (
    <section id="services" className="py-24 bg-gray-50/50 dark:bg-[#030303] overflow-hidden relative">
      {/* Background */}
      <div className="hero-glow-3 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="section-badge mx-auto mb-4">
            <Sparkles size={11} /> What I Build
          </div>
          <h2 className="section-heading text-gray-900 dark:text-white mb-4">
            Skills & <span className="gradient-orange">Expertise</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Full-stack capabilities across web and mobile — from pixel-perfect UIs to scalable backend APIs.
          </p>
        </motion.div>

        {/* ── Bento Grid Layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16 auto-rows-auto">

          {/* Service cards — large left */}
          {SERVICES_DATA.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="bento-card p-7 flex flex-col gap-4 col-span-1 group"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}25` }}
                >
                  <Icon size={22} style={{ color: s.color }} />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-orange-500 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {s.techs.map((t, j) => (
                    <span key={j} className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Skill levels card — spans remaining space */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bento-card p-7 col-span-1 md:col-span-3 lg:col-span-1 row-span-2 lg:row-span-1"
          >
            <div className="flex items-center gap-2 mb-6">
              <Zap size={14} className="text-orange-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Proficiency</span>
            </div>
            <div className="space-y-5">
              {SKILLS.map((s, i) => (
                <SkillBar key={i} {...s} delay={i * 0.08} />
              ))}
            </div>
          </motion.div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bento-card p-7 col-span-1 md:col-span-1 flex flex-col items-center justify-center text-center gap-2"
          >
            <div className="text-5xl font-display font-extrabold gradient-orange">5+</div>
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Live Projects</div>
          </motion.div>

          {/* Currently learning badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bento-card p-7 col-span-1 md:col-span-2 flex flex-col gap-3 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />
            <span className="section-badge w-fit !text-[10px]">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              Currently Building
            </span>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">
              Chit-Chat E2E encrypted messaging & video calling with{' '}
              <span className="text-orange-500 font-bold">WebRTC</span> + Firebase.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {['WebRTC', 'Firebase', 'E2E Encryption', 'React Native'].map((t, i) => (
                <span key={i} className="text-[10px] px-2 py-1 rounded-lg bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20 font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tech logos grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gray-100 dark:bg-white/5" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Technical Arsenal</span>
            <div className="h-px flex-1 bg-gray-100 dark:bg-white/5" />
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-7 gap-3">
            {TECH_STACK.map((item, i) => (
              <TechBadge key={i} item={item} i={i} />
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── Tech Marquee Strip (dark band) ── */}
      <div className="mt-20 relative overflow-hidden">
        <div className="bg-black dark:bg-black py-12 relative border-y border-white/5">
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          {/* Orange glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-orange-500/5 blur-3xl rounded-full pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-500">Tech Stack · Hover to pause</span>
          </div>

          <div className="relative z-10 space-y-4">
            <TechMarquee items={TECH_STACK} reverse={false} />
            <TechMarquee items={[...TECH_STACK].reverse()} reverse={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;