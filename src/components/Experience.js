// components/Experience.js — Auto-Scrolling Marquee Work Experience Showcase
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { experiences } from '../data/experience';
import { FaCalendarAlt, FaMapMarkerAlt, FaBriefcase, FaExternalLinkAlt } from 'react-icons/fa';
import { Award, Building2, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

/* Stats bar metrics */
const EXP_STATS = [
  { value: '2',   label: 'Internships Completed' },
  { value: '6+',  label: 'Months Experience' },
  { value: '5+',  label: 'Live Features Shipped' },
  { value: '3',   label: 'Core Stacks' },
];

/* ── Experience Card Component ──────────────────────── */
const ExperienceCard = ({ experience }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="w-80 sm:w-[450px] flex-shrink-0 saas-card overflow-hidden group cursor-default">
      {/* Top Accent Gradient */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400" />

      <div className="p-7 sm:p-8">
        {/* Header: Logo, Title, Badge, Duration */}
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="relative w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0 p-2 shadow-sm group-hover:border-orange-400 transition-colors">
              <Image
                src={experience.companyLogo}
                alt={experience.company}
                fill
                className="object-contain p-2"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  {experience.role}
                </h3>
                <span className="px-2.5 py-0.5 bg-orange-500 text-white text-[10px] font-extrabold rounded-md uppercase tracking-wider shadow-sm">
                  {experience.type}
                </span>
              </div>

              <div className="flex items-center gap-1.5 mb-1.5">
                <Building2 size={14} className="text-orange-500 flex-shrink-0" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{experience.company}</span>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <FaCalendarAlt size={11} className="text-orange-500" />
                  {experience.duration} · <strong className="text-gray-700 dark:text-gray-300">{experience.durationLabel}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <FaMapMarkerAlt size={11} className="text-orange-500" />
                  {experience.location}
                </span>
              </div>
            </div>
          </div>

          {/* Certificate Action Button */}
          {experience.certificate && (
            <a
              href={experience.certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-orange-500 dark:hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex-shrink-0"
            >
              <Award size={15} />
              Certificate
              <FaExternalLinkAlt size={10} />
            </a>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-gray-800/80 mb-6" />

        {/* Key Deliverables Bullet Points */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-extrabold text-orange-500 uppercase tracking-widest">
              Key Responsibilities & Impact
            </p>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-gray-400 hover:text-orange-500 font-bold flex items-center gap-1 cursor-pointer"
            >
              {expanded ? <><ChevronUp size={14} /> Collapse</> : <><ChevronDown size={14} /> Expand</>}
            </button>
          </div>

          <ul className="space-y-3">
            {(expanded ? experience.description : experience.description.slice(0, 2)).map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium"
              >
                <div className="w-5 h-5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={12} className="text-orange-500" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Used */}
        <div>
          <p className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2.5">
            Technologies & Tools
          </p>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 text-[11px] font-bold rounded-lg border border-orange-100 dark:border-orange-900/40"
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

/* ── Hardware Accelerated Experience Marquee ────────── */
const ExperienceMarquee = () => {
  const multiplied = [...experiences, ...experiences, ...experiences, ...experiences];
  return (
    <div className="overflow-hidden w-full py-4">
      <div className="flex gap-6 w-max animate-marquee-slow">
        {multiplied.map((exp, i) => (
          <ExperienceCard key={i} experience={exp} />
        ))}
      </div>
    </div>
  );
};

/* ── Main Experience Section ────────────────────────── */
const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-[#fafafa] dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="saas-section-badge mx-auto mb-4">
            Work Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Work <span className="gradient-orange">Experience</span>
          </h2>
          <div className="h-1 w-16 bg-orange-500 mx-auto rounded-full mb-5" />
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">
            Auto-scrolling experience marquee · Hover to pause & read deliverables
          </p>
        </motion.div>

      </div>

      {/* Experience Horizontal Auto-Scrolling Marquee */}
      <ExperienceMarquee />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Counter Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {EXP_STATS.map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 text-center shadow-sm hover:border-orange-400 transition-colors"
            >
              <div className="text-3xl font-black gradient-orange mb-1">{stat.value}</div>
              <div className="text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* LinkedIn Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.linkedin.com/in/rachit-gupta-099999261"
            target="_blank"
            rel="noopener noreferrer"
            className="saas-btn-outline inline-flex"
          >
            <FaBriefcase size={16} />
            View Complete Profile on LinkedIn
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Experience;
