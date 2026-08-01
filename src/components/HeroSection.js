"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Github, Linkedin, Zap, Code2, Smartphone, Globe } from 'lucide-react';
import FloatingActionButton from './FloatingActionButton';
import Image from 'next/image';

/* ── Rotating words ── */
const ROLES = ['Next.js Developer', 'React Native Dev', 'Full-Stack Engineer', 'Web Developer', 'App Developer'];

/* ── Stats ── */
const STATS = [
  { value: '5+',   label: 'Live Projects'    },
  { value: '2',    label: 'Companies'        },
  { value: '2+',   label: 'Years Coding'     },
  { value: '100%', label: 'On Vercel'        },
];

/* ── Floating orbit tech badges ── */
const ORBIT_TECHS = [
  { label: 'Next.js',   icon: '▲', color: '#000', bg: '#fff',     angle: 0   },
  { label: 'React',     icon: '⚛',  color: '#61DAFB', bg: '#0d1117', angle: 90  },
  { label: 'TypeScript',icon: 'TS', color: '#fff', bg: '#3178C6', angle: 180 },
  { label: 'Node.js',   icon: '⬡',  color: '#fff', bg: '#339933', angle: 270 },
];

/* ── Container variant ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/* ── Rotating word component ── */
const RotatingRole = () => {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % ROLES.length);
        setVisible(true);
      }, 350);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      style={{ transition: 'opacity 0.35s, transform 0.35s' }}
      className={`gradient-orange font-display font-extrabold ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
    >
      {ROLES[idx]}
    </span>
  );
};

/* ── Orbit ring component ── */
const OrbitBadge = ({ tech, delay = 0 }) => (
  <motion.div
    className="absolute"
    style={{
      top: '50%', left: '50%',
      transformOrigin: '0 0',
    }}
    animate={{ rotate: [tech.angle, tech.angle + 360] }}
    transition={{ duration: 18, ease: 'linear', repeat: Infinity, delay }}
  >
    <div
      style={{ transform: `translateX(130px) translateY(-50%)`, transformOrigin: 'left center' }}
    >
      <motion.div
        animate={{ rotate: [-(tech.angle), -(tech.angle + 360)] }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity, delay }}
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-black shadow-lg shadow-black/20 border border-white/10"
        style={{ background: tech.bg, color: tech.color, fontSize: tech.label === 'TypeScript' ? '9px' : '16px' }}
        title={tech.label}
      >
        {tech.icon}
      </motion.div>
    </div>
  </motion.div>
);

/* ── Main HeroSection ── */
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-white dark:bg-[#030303] overflow-hidden"
      style={{ paddingTop: '100px' }}
    >
      {/* Background glows */}
      <div className="hero-glow-1 dark:opacity-70" />
      <div className="hero-glow-2 dark:opacity-50" />
      <div className="hero-glow-3 dark:opacity-40" />

      {/* Grid lines overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="dark:block hidden absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Watermark */}
      <span className="watermark-text select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        RACHIT
      </span>

      {/* ── Content ── */}
      <motion.div
        style={{ y: y1 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Text ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            {/* Availability badge */}
            <motion.div variants={itemVariants} className="mb-6 w-fit">
              <div className="section-badge">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Available · 2026 Batch · Open to Hire
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-gray-900 dark:text-white leading-[1.05] mb-4 tracking-tight"
            >
              Hi, I'm{' '}
              <span className="gradient-orange">Rachit</span>
              <br />
              <span className="text-gray-900 dark:text-white">Gupta</span>
            </motion.h1>

            {/* Rotating role */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5 min-h-[36px]">
              <span className="text-lg sm:text-xl font-semibold text-gray-500 dark:text-gray-400">
                Expert in
              </span>
              <div style={{ minWidth: '240px' }}>
                <RotatingRole />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base text-gray-500 dark:text-gray-400 mb-8 max-w-lg leading-relaxed"
            >
              Full-Stack Engineer building scalable web & mobile apps with{' '}
              <span className="font-semibold text-gray-900 dark:text-white">Next.js 16</span>,{' '}
              <span className="font-semibold text-orange-500">React Native</span>, and{' '}
              <span className="font-semibold text-gray-900 dark:text-white">Node.js</span>.
              Ready to ship production features from day one.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Hire Me Now <ArrowRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-ghost"
              >
                View Projects
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="/Resume.pdf"
                download
                className="btn-ghost !px-5 flex items-center gap-2"
              >
                Resume ↓
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-4 gap-3">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="bento-card p-3 text-center"
                >
                  <div className="text-xl font-display font-extrabold gradient-orange">{stat.value}</div>
                  <div className="text-[9px] font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mt-0.5 leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social strip */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 mt-6">
              <span className="text-xs text-gray-400 font-medium">Find me on</span>
              <a href="https://github.com/Rachit3784" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all"
              >
                <Github size={14} />
              </a>
              <a href="https://www.linkedin.com/in/rachit-gupta-099999261" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all"
              >
                <Linkedin size={14} />
              </a>
              <div className="h-px flex-1 bg-gray-100 dark:bg-white/5" />
              <span className="text-xs font-medium text-gray-400">Jabalpur, India</span>
            </motion.div>
          </motion.div>

          {/* ── Right: Profile with orbit ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 md:w-[340px] md:h-[340px] flex items-center justify-center">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-orange-300/40 dark:border-orange-500/20 animate-spin-slow" />
              <div className="absolute inset-6 rounded-full border border-dashed border-orange-200/30 dark:border-orange-500/10 animate-spin-reverse" />

              {/* Glow backdrop */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-orange-400/20 to-orange-600/10 blur-2xl animate-glowPulse" />

              {/* Orbit badges */}
              {ORBIT_TECHS.map((tech, i) => (
                <OrbitBadge key={i} tech={tech} delay={i * 0.5} />
              ))}

              {/* Profile image - hexagonal clip */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative w-52 h-52 md:w-60 md:h-60 rounded-full overflow-hidden z-10 shadow-2xl animate-float"
                style={{
                  boxShadow: '0 0 0 4px rgba(249,115,22,0.3), 0 0 0 8px rgba(249,115,22,0.1), 0 20px 60px rgba(0,0,0,0.3)',
                }}
              >
                <Image
                  src="/Profile.jpg"
                  alt="Rachit Gupta"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
              </motion.div>

              {/* Floating status card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-6 -right-4 glass-card rounded-2xl px-4 py-3 shadow-xl z-20 animate-float-reverse"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-ping-slow" />
                  <span className="text-xs font-bold text-gray-900 dark:text-white">Open to Work</span>
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 font-medium">Available immediately</p>
              </motion.div>

              {/* Floating tech card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -top-4 -left-8 glass-card rounded-2xl px-4 py-3 shadow-xl z-20"
              >
                <div className="flex items-center gap-2">
                  <Zap size={12} className="text-orange-500" />
                  <span className="text-xs font-bold text-gray-900 dark:text-white">Next.js 16</span>
                </div>
                <p className="text-[10px] text-orange-500 font-semibold mt-0.5">App Router Expert</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors cursor-pointer"
        >
          <div className="scroll-indicator" />
          <span className="text-[10px] font-medium tracking-widest uppercase opacity-60">Scroll</span>
        </motion.button>
      </motion.div>

      <FloatingActionButton />
    </section>
  );
};

export default HeroSection;