// components/Services.js — Apple Invite-style Infinite Horizontal Carousel + Magical Tech Stack
"use client";
import React, { useRef, useState, useEffect } from 'react';
import { FaLaptopCode, FaMobileAlt, FaServer } from 'react-icons/fa';
import { motion, useAnimation, animate } from 'framer-motion';
import { services } from '../data/services';
import Image from 'next/image';

const iconComponents = { FaLaptopCode, FaMobileAlt, FaServer };

/* ── Tech stack data with color codes ─────────────────── */
const TECH_STACK = [
  { name: 'Next.js 16',      logo: '/logos/nextjs.svg',          color: '#000000' },
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

/* ── Infinite marquee strip ──────────────────────────── */
const InfiniteMarquee = ({ items, speed = 35, reverse = false }) => {
  const doubled = [...items, ...items]; // double for seamless loop
  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex gap-5 w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((skill, i) => (
          <div
            key={i}
            className="flex-shrink-0 group relative flex flex-col items-center justify-center gap-2
              w-24 h-28 bg-white dark:bg-gray-900
              border border-gray-200 dark:border-gray-800
              rounded-2xl shadow-sm
              hover:border-orange-400 hover:shadow-orange-100 dark:hover:shadow-orange-900/20
              hover:shadow-lg hover:-translate-y-1
              transition-all duration-300 cursor-default"
          >
            {/* Colored top border on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: skill.color }}
            />
            <div className="relative w-10 h-10">
              <Image src={skill.logo} alt={skill.name} fill style={{ objectFit: 'contain' }} />
            </div>
            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 group-hover:text-orange-500 transition-colors text-center leading-tight px-1">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Service Card ────────────────────────────────────── */
const ServiceCard = ({ service }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = iconComponents[service.icon] || FaLaptopCode;

  return (
    <div
      className="flex-shrink-0 w-80 saas-card overflow-hidden cursor-default snap-start"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="h-1 w-full bg-orange-500 transition-transform duration-300 origin-left"
        style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }}
      />
      <div className="p-7">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
          style={{ background: hovered ? '#f97316' : '#fff7ed' }}
        >
          <Icon
            className="text-2xl transition-colors duration-300"
            style={{ color: hovered ? '#fff' : '#f97316' }}
          />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500">
          {service.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
          {service.description}
        </p>
        {/* Slide-up tech pills */}
        <div
          className="overflow-hidden transition-all duration-400"
          style={{
            maxHeight: hovered ? '200px' : '0',
            opacity: hovered ? 1 : 0,
            transition: 'max-height 0.4s ease, opacity 0.3s ease',
          }}
        >
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Core Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {service.technologies.map((t, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 text-[11px] font-semibold rounded-md border border-orange-100 dark:border-orange-900/40"
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

/* ── Draggable Carousel ──────────────────────────────── */
const DraggableCarousel = ({ children }) => {
  const ref = useRef(null);
  const [isDragging, setDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const autoTimer = useRef(null);

  const stopAuto = () => clearInterval(autoTimer.current);
  const startAuto = () => {
    stopAuto();
    autoTimer.current = setInterval(() => {
      if (ref.current) {
        ref.current.scrollLeft += 1.2;
        // Seamless loop
        const { scrollLeft: sl, scrollWidth, clientWidth } = ref.current;
        if (sl >= (scrollWidth - clientWidth) / 2) {
          ref.current.scrollLeft = 0;
        }
      }
    }, 16);
  };

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, []);

  const onMouseDown = (e) => {
    setDragging(true);
    stopAuto();
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
  };
  const onMouseUp = () => { setDragging(false); startAuto(); };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.8;
    ref.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseUp}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className="flex gap-5 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing pb-4 snap-x"
      style={{ userSelect: 'none' }}
    >
      {children}
    </div>
  );
};

/* ── Main Component ──────────────────────────────────── */
const Services = () => {
  // Double items for seamless auto-scroll loop
  const doubledServices = [...services, ...services, ...services];

  return (
    <section id="services" className="py-24 bg-[#f8f8f8] dark:bg-[#111827] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="saas-section-badge mx-auto mb-4">What I Offer</div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Core <span className="gradient-orange">Expertise</span>
          </h2>
          <div className="h-1 w-16 bg-orange-500 mx-auto rounded-full mb-5" />
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
            Drag to explore · Full-stack engineering capabilities across web, mobile & backend
          </p>
        </motion.div>

        {/* Carousel */}
        <DraggableCarousel>
          {doubledServices.map((service, i) => (
            <ServiceCard key={i} service={service} />
          ))}
        </DraggableCarousel>

      </div>

      {/* ── Magical Tech Stack ──────────────────────────────── */}
      <div className="mt-24 relative overflow-hidden">
        {/* Dark strip background */}
        <div className="bg-[#111111] dark:bg-[#0a0a0a] py-16 relative">
          {/* Grid lines overlay */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* Section header */}
          <div className="text-center mb-10 px-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Technical Arsenal</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
              Tech <span className="text-orange-500">Stack</span>
            </h3>
            <p className="text-gray-500 text-sm">Hover any card to reveal the technology</p>
          </div>

          {/* Row 1: left → right */}
          <div className="mb-5 relative z-10">
            <InfiniteMarquee items={TECH_STACK} speed={40} reverse={false} />
          </div>

          {/* Row 2: right → left (different speed for depth) */}
          <div className="relative z-10">
            <InfiniteMarquee items={[...TECH_STACK].reverse()} speed={55} reverse={true} />
          </div>

          {/* Left/right fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-20"
            style={{ background: 'linear-gradient(to right, #111111, transparent)' }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-20"
            style={{ background: 'linear-gradient(to left, #111111, transparent)' }} />
        </div>
      </div>
    </section>
  );
};

export default Services;