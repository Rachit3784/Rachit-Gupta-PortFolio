"use client";
// src/components/chat/VerticalMarqueePanel.js — Desktop 35% Panel
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trophy, GraduationCap, Code2, MapPin, Sparkles, CheckCircle2, Star } from 'lucide-react';
import {
  SiNextdotjs, SiReact, SiNodedotjs, SiMongodb, SiTypescript, SiExpress, SiFirebase,
} from 'react-icons/si';

const SKILLS = [
  { name: 'Next.js 16 (App Router)', Icon: SiNextdotjs,  color: '#fff',    bg: '#000'    },
  { name: 'React Native (iOS & Android)', Icon: SiReact, color: '#61DAFB', bg: '#0d1117' },
  { name: 'Node.js & Express REST APIs', Icon: SiNodedotjs, color: '#339933', bg: '#0d1f0d' },
  { name: 'MongoDB Atlas & Mongoose', Icon: SiMongodb,   color: '#47A248', bg: '#0d1f0d' },
  { name: 'TypeScript & JavaScript', Icon: SiTypescript, color: '#fff',    bg: '#3178C6' },
  { name: 'Firebase & Realtime DB', Icon: SiFirebase,  color: '#FFCA28', bg: '#1a1a0a' },
];

const HIGHLIGHTS = [
  { icon: Trophy,        title: 'Merit Scholarship', desc: '80% Tuition Fee Waiver (TFW) — Top Percentile' },
  { icon: GraduationCap, title: 'B.Tech CSE (2022-2026)', desc: 'Gyan Ganga College of Tech · CGPA: 7.53/10' },
  { icon: Code2,         title: 'Full-Stack Developer', desc: 'Building web & mobile apps since 2022' },
];

const VerticalMarqueePanel = () => {
  return (
    <div className="h-full w-full bg-white/[0.02] backdrop-blur-2xl border-r border-white/10 flex flex-col overflow-hidden relative">

      {/* Header Profile Section */}
      <div className="p-6 border-b border-white/10 bg-white/[0.03] flex flex-col items-center text-center flex-shrink-0 z-10">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-orange-500/50 shadow-xl shadow-orange-500/20">
            <Image src="/Profile.jpg" alt="Rachit Gupta" fill className="object-cover" />
          </div>
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#030303]" />
        </div>
        <h2 className="text-lg font-bold font-display text-white">Rachit Gupta</h2>
        <p className="text-xs text-orange-400 font-semibold mt-0.5">Full-Stack Engineer · 2026 Batch</p>
        <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1 justify-center">
          <MapPin size={11} /> Jabalpur, Madhya Pradesh, India
        </p>
      </div>

      {/* Auto-scrolling Vertical Marquee Loop */}
      <div className="flex-1 overflow-hidden relative py-4">

        {/* Top/Bottom Gradient Fades */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#030303] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#030303] to-transparent z-10 pointer-events-none" />

        {/* Infinite Vertical Scroll Container */}
        <motion.div
          animate={{ y: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="space-y-4 px-5"
        >
          {/* Double list for smooth loop */}
          {[...SKILLS, ...HIGHLIGHTS, ...SKILLS, ...HIGHLIGHTS].map((item, i) => {
            const Icon = item.Icon || item.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-orange-500/30 transition-all flex items-start gap-3 shadow-md"
              >
                {item.Icon ? (
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.bg }}>
                    <Icon style={{ color: item.color, fontSize: '18px' }} />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-orange-400" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white leading-tight">{item.name || item.title}</p>
                  <p className="text-[11px] text-gray-400 mt-1 leading-snug">{item.desc || 'Core Skill'}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

    </div>
  );
};

export default VerticalMarqueePanel;
