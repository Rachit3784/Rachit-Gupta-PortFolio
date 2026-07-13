// components/Services.js — Auto-Scrolling Marquee Services & Tech Stack
"use client";
import React, { useState } from 'react';
import { FaLaptopCode, FaMobileAlt, FaServer } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const iconComponents = { FaLaptopCode, FaMobileAlt, FaServer };

/* ── Tech stack data ────────────────────────────────── */
const TECH_STACK = [
  { name: 'Next.js 16',      logo: '/logos/nextjs.svg',          color: '#f97316' },
  { name: 'React Native',    logo: '/logos/reactnative.svg',     color: '#61DAFB' },
  { name: 'React.js',        logo: '/logos/react.svg',           color: '#61DAFB' },
  { name: 'Node.js',         logo: '/logos/node.svg',            color: '#339933' },
  { name: 'MongoDB Atlas',   logo: '/logos/mongodb.svg',         color: '#47A248' },
  { name: 'Express.js',      logo: '/logos/express.png',         color: '#999999' },
  { name: 'TypeScript',      logo: '/logos/Typescript.png',      color: '#3178C6' },
  { name: 'JavaScript',      logo: '/logos/javascript.svg',      color: '#F7DF1E' },
  { name: 'Tailwind CSS',    logo: '/logos/tailwind.svg',        color: '#06B6D4' },
  { name: 'Redux / Zustand', logo: '/logos/redux.svg',           color: '#764ABC' },
  { name: 'Firebase',        logo: '/logos/logo-vertical.png',   color: '#FFCA28' },
];

/* ── Service Card Component ─────────────────────────── */
const ServiceCard = ({ service }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = iconComponents[service.icon] || FaLaptopCode;

  return (
    <div
      className="w-80 sm:w-96 flex-shrink-0 saas-card flex flex-col justify-between overflow-hidden group cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        {/* Top Accent Line */}
        <div
          className="h-1.5 w-full bg-gradient-to-r from-orange-500 to-amber-500 transition-transform duration-300 origin-left"
          style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0.2)' }}
        />

        <div className="p-7 sm:p-8">
          {/* Icon Badge */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-sm"
            style={{
              background: hovered ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' : '#fff7ed',
              boxShadow: hovered ? '0 10px 25px rgba(249, 115, 22, 0.35)' : 'none',
            }}
          >
            <Icon
              className="text-3xl transition-colors duration-300"
              style={{ color: hovered ? '#ffffff' : '#f97316' }}
            />
          </div>

          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors tracking-tight">
            {service.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            {service.description}
          </p>
        </div>
      </div>

      <div className="p-7 sm:p-8 pt-0">
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80">
          <p className="text-[10px] font-extrabold text-orange-500 uppercase tracking-widest mb-3 flex items-center gap-1">
            <Sparkles size={11} /> Core Tech Stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {service.technologies.map((t, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 text-[11px] font-bold rounded-lg border border-orange-100 dark:border-orange-900/40"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Hardware Accelerated Services Marquee Carousel ───── */
const ServicesMarquee = () => {
  // Multiply items for seamless continuous auto scroll loop
  const multiplied = [...services, ...services, ...services, ...services];
  return (
    <div className="overflow-hidden w-full py-4">
      <div className="flex gap-6 w-max animate-marquee-slow">
        {multiplied.map((service, i) => (
          <ServiceCard key={i} service={service} />
        ))}
      </div>
    </div>
  );
};

/* ── Hardware Accelerated Tech Marquee Strip ──────────── */
const TechMarquee = ({ items, reverse = false }) => {
  const multiplied = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden w-full py-2">
      <div className={`flex gap-5 w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {multiplied.map((skill, i) => (
          <div
            key={i}
            className="flex-shrink-0 group relative flex flex-col items-center justify-center gap-2
              w-28 h-28 bg-white dark:bg-[#0a0a0a]
              border border-gray-200 dark:border-zinc-800
              rounded-2xl shadow-sm
              hover:border-orange-500 hover:shadow-orange-500/20
              hover:shadow-xl hover:-translate-y-1.5
              transition-all duration-300 cursor-default"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: skill.color }}
            />
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
              <Image src={skill.logo} alt={skill.name} fill style={{ objectFit: 'contain' }} />
            </div>
            <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 group-hover:text-orange-500 transition-colors text-center leading-tight px-1">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Main Services Component ───────────────────────── */
const Services = () => {
  return (
    <section id="services" className="py-24 bg-[#fafafa] dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="saas-section-badge mx-auto mb-4">
            What I Offer
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Core <span className="gradient-orange">Expertise</span>
          </h2>
          <div className="h-1 w-16 bg-orange-500 mx-auto rounded-full mb-5" />
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
            Auto-scrolling expertise marquee · Hover any card to pause & inspect
          </p>
        </motion.div>

        {/* Services Horizontal Auto-Scrolling Marquee */}
        <ServicesMarquee />

      </div>

      {/* ── Technical Stack Marquee Strip ────────────────────────────── */}
      <div className="mt-16 relative overflow-hidden">
        <div className="bg-black py-16 relative border-y border-zinc-800">
          {/* Grid lines overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Section header */}
          <div className="text-center mb-10 px-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full mb-4">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest">Technical Arsenal</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
              Technical <span className="text-orange-500">Stack</span>
            </h3>
            <p className="text-gray-400 text-sm font-medium">Hover any badge to pause and highlight</p>
          </div>

          {/* Row 1: Left to Right */}
          <div className="mb-5 relative z-10">
            <TechMarquee items={TECH_STACK} reverse={false} />
          </div>

          {/* Row 2: Right to Left */}
          <div className="relative z-10">
            <TechMarquee items={[...TECH_STACK].reverse()} reverse={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;