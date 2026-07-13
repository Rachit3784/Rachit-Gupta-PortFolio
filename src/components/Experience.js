// components/Experience.js — Horizontal Auto-Scroll Carousel + 90s Dense Business Style
"use client";
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../data/experience';
import { FaCalendarAlt, FaMapMarkerAlt, FaBriefcase, FaExternalLinkAlt } from 'react-icons/fa';
import { Award, Building2, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

/* Stats bar */
const EXP_STATS = [
  { value: '2',   label: 'Internships' },
  { value: '6+',  label: 'Months Exp.'  },
  { value: '5+',  label: 'Live Projects' },
  { value: '3',   label: 'Stacks'        },
];

/* ── Experience Card (dense 90s business style) ──────── */
const ExperienceCard = ({ experience }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-80 sm:w-[420px] bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        rounded-2xl overflow-hidden snap-start
        hover:border-orange-400 hover:shadow-xl transition-all duration-300"
    >
      {/* Top orange accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 to-amber-400" />

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className="relative w-14 h-14 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0">
            <Image src={experience.companyLogo} alt={experience.company} fill className="object-contain p-2" />
          </div>

          {/* Role + Meta */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-base font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                {experience.role}
              </h3>
              <span className="px-2 py-0.5 bg-orange-500 text-white text-[9px] font-black rounded uppercase tracking-widest">
                {experience.type}
              </span>
            </div>

            <div className="flex items-center gap-1.5 mb-2">
              <Building2 size={12} className="text-orange-500 flex-shrink-0" />
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate">{experience.company}</span>
            </div>

            <div className="flex flex-wrap gap-3 text-[11px] text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <FaCalendarAlt size={10} className="text-orange-400" />
                {experience.duration}
                <span className="font-bold text-gray-700 dark:text-gray-300 ml-1">· {experience.durationLabel}</span>
              </span>
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt size={10} className="text-orange-400" />
                {experience.location}
              </span>
            </div>
          </div>

          {/* Certificate */}
          {experience.certificate && (
            <a href={experience.certificate} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 w-9 h-9 bg-gray-100 dark:bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-all duration-300"
              title="View Certificate">
              <Award size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-gray-100 dark:bg-gray-800" />

      {/* Responsibilities */}
      <div className="p-6 pt-4">
        <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-3">
          Key Deliverables
        </p>
        <ul className="space-y-2">
          {(expanded ? experience.description : experience.description.slice(0, 2)).map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              <CheckCircle2 size={13} className="text-orange-500 flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
        {experience.description.length > 2 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-[11px] font-bold text-orange-500 hover:text-orange-600 transition-colors cursor-pointer flex items-center gap-1"
          >
            {expanded ? 'Show less ↑' : `+${experience.description.length - 2} more deliverables ↓`}
          </button>
        )}

        {/* Tech tags */}
        <div className="mt-4">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Stack</p>
          <div className="flex flex-wrap gap-1">
            {experience.technologies.map((t, i) => (
              <span key={i}
                className="px-2 py-0.5 bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 text-[10px] font-semibold rounded border border-orange-100 dark:border-orange-900/40">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Draggable Carousel with controls ───────────────── */
const ExperienceCarousel = () => {
  const ref = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const autoTimer = useRef(null);
  const [paused, setPaused] = useState(false);

  // Only 2 experiences, so just repeat for demo
  const items = [...experiences, ...experiences, ...experiences, ...experiences];

  const stopAuto = () => clearInterval(autoTimer.current);
  const startAuto = () => {
    stopAuto();
    autoTimer.current = setInterval(() => {
      if (!ref.current || paused) return;
      ref.current.scrollLeft += 0.7;
      const { scrollLeft: sl, scrollWidth, clientWidth } = ref.current;
      if (sl >= (scrollWidth - clientWidth) * 0.5) {
        ref.current.scrollLeft = 0;
      }
    }, 16);
  };

  useEffect(() => { startAuto(); return stopAuto; }, [paused]);

  const scroll = (dir) => {
    ref.current?.scrollBy({ left: dir * 440, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Nav Arrows */}
      <button onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full shadow-md flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all -translate-x-5 cursor-pointer">
        <ChevronLeft size={18} />
      </button>
      <button onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full shadow-md flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all translate-x-5 cursor-pointer">
        <ChevronRight size={18} />
      </button>

      <div
        ref={ref}
        onMouseDown={(e) => {
          isDragging.current = true; stopAuto();
          startX.current = e.pageX - ref.current.offsetLeft;
          scrollLeft.current = ref.current.scrollLeft;
        }}
        onMouseLeave={() => { isDragging.current = false; setPaused(false); startAuto(); }}
        onMouseUp={() => { isDragging.current = false; startAuto(); }}
        onMouseMove={(e) => {
          if (!isDragging.current) return;
          e.preventDefault();
          const x = e.pageX - ref.current.offsetLeft;
          ref.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
        }}
        onMouseEnter={() => { stopAuto(); setPaused(true); }}
        className="flex gap-5 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing pb-4 px-2 snap-x"
        style={{ userSelect: 'none' }}
      >
        {items.map((exp, i) => (
          <ExperienceCard key={i} experience={exp} />
        ))}
      </div>

      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10"
        style={{ background: 'linear-gradient(to right, #f8f8f8, transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10"
        style={{ background: 'linear-gradient(to left, #f8f8f8, transparent)' }} />
    </div>
  );
};

/* ── Main Section ────────────────────────────────────── */
const Experience = () => (
  <section id="experience" className="py-24 bg-[#f8f8f8] dark:bg-[#111827] overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="saas-section-badge mx-auto mb-4">Work Journey</div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
          Work <span className="gradient-orange">Experience</span>
        </h2>
        <div className="h-1 w-16 bg-orange-500 mx-auto rounded-full mb-5" />
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">
          Drag to explore · Hands-on internship experience shipping live web & mobile applications
        </p>
      </motion.div>

      {/* Carousel */}
      <ExperienceCarousel />

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {EXP_STATS.map((stat, i) => (
          <div key={i}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 text-center hover:border-orange-400 transition-colors">
            <div className="text-3xl font-black gradient-orange mb-1">{stat.value}</div>
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* LinkedIn CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mt-10 text-center"
      >
        <a href="https://www.linkedin.com/in/rachit-gupta-099999261" target="_blank" rel="noopener noreferrer"
          className="saas-btn-outline inline-flex">
          <FaBriefcase size={16} />
          View Full Profile on LinkedIn
        </a>
      </motion.div>
    </div>
  </section>
);

export default Experience;
