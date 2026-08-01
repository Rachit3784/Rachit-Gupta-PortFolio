// components/Experience.js — Animated Timeline with Company Logos
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../data/experience';
import {
  SiNextdotjs, SiReact, SiNodedotjs, SiMongodb, SiExpress,
  SiTypescript, SiAxios, SiRedux, SiFirebase,
} from 'react-icons/si';
import { FaCalendarAlt, FaMapMarkerAlt, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import { Award, Building2, CheckCircle2, ChevronDown, ChevronUp, Briefcase, ArrowUpRight, Zap } from 'lucide-react';
import Image from 'next/image';

/* ── Tech icon map ── */
const TECH_ICONS = {
  'React Native':  { Icon: SiReact,       color: '#61DAFB', bg: '#0d1117' },
  'TypeScript':    { Icon: SiTypescript,  color: '#fff',    bg: '#3178C6' },
  'Node.js':       { Icon: SiNodedotjs,  color: '#339933', bg: '#0d1f0d' },
  'MongoDB Atlas': { Icon: SiMongodb,    color: '#47A248', bg: '#0d1f0d' },
  'Express.js':    { Icon: SiExpress,    color: '#ccc',    bg: '#111'    },
  'Next.js 16':    { Icon: SiNextdotjs,  color: '#fff',    bg: '#000'    },
  'React.js':      { Icon: SiReact,      color: '#61DAFB', bg: '#0d1117' },
  'Redux':         { Icon: SiRedux,      color: '#fff',    bg: '#764ABC' },
  'Firebase':      { Icon: SiFirebase,   color: '#FFCA28', bg: '#1a1a0a' },
};

/* ── Company logos (using SVG/PNG from public + SI icons as fallback) ── */
const COMPANY_DATA = {
  'app-developer-internship': {
    logoUrl: '/logos/wecofy.png',
    accentColor: '#f97316',
    industry: 'Entertainment Tech',
  },
  'fullstack-web-internship': {
    logoUrl: '/logos/zaalima.jpg',
    accentColor: '#6366f1',
    industry: 'Web Development Agency',
  },
};

/* ── Stats ── */
const STATS = [
  { value: '2',   label: 'Internships' },
  { value: '6+',  label: 'Months Exp.' },
  { value: '10+', label: 'Features Shipped' },
  { value: '3',   label: 'Core Stacks' },
];

/* ── Experience Card ── */
const ExperienceCard = ({ exp, index, isLast }) => {
  const [expanded, setExpanded] = useState(true);
  const company = COMPANY_DATA[exp.id] || { accentColor: '#f97316', industry: '' };
  const isCurrent = exp.durationLabel === 'Current Role';

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-6 group"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.2, type: 'spring', stiffness: 400 }}
          className="relative z-10 flex-shrink-0"
        >
          <div
            className="w-5 h-5 rounded-full border-2 border-white dark:border-[#030303] shadow-lg"
            style={{ background: company.accentColor }}
          />
          {isCurrent && (
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-40"
              style={{ background: company.accentColor }}
            />
          )}
        </motion.div>

        {/* Line */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.4, duration: 0.8, ease: 'easeOut' }}
            className="w-px flex-1 min-h-[40px] mt-2"
            style={{ background: `linear-gradient(to bottom, ${company.accentColor}60, transparent)` }}
          />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 pb-10">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="bento-card overflow-hidden relative group"
          style={{ '--accent': company.accentColor }}
        >
          {/* Accent top bar */}
          <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${company.accentColor}, ${company.accentColor}44)` }} />

          <div className="p-6 sm:p-8">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {/* Company Logo */}
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex-shrink-0 shadow-sm group-hover:shadow-md transition-all">
                  {company.logoUrl ? (
                    <Image src={company.logoUrl} alt={exp.company} fill className="object-contain p-2" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 size={24} style={{ color: company.accentColor }} />
                    </div>
                  )}
                </div>

                {/* Title & company */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white tracking-tight">
                      {exp.role}
                    </h3>
                    {isCurrent && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-full">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        LIVE
                      </span>
                    )}
                    <span
                      className="px-2 py-0.5 text-[10px] font-bold rounded-full text-white"
                      style={{ background: company.accentColor }}
                    >
                      {exp.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Building2 size={12} style={{ color: company.accentColor }} />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{exp.company}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-400 font-medium">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt size={10} style={{ color: company.accentColor }} />
                      {exp.duration} · <strong className="text-gray-600 dark:text-gray-300">{exp.durationLabel}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt size={10} style={{ color: company.accentColor }} />
                      {exp.location}
                    </span>
                    {company.industry && (
                      <span className="text-gray-400">{company.industry}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Certificate */}
              {exp.certificate && (
                <a
                  href={exp.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:shadow-lg flex-shrink-0"
                  style={{ background: company.accentColor }}
                >
                  <Award size={13} />
                  Certificate
                  <FaExternalLinkAlt size={9} />
                </a>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 dark:bg-white/5 mb-6" />

            {/* Responsibilities */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: company.accentColor }}>
                  Key Impact & Responsibilities
                </span>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-xs text-gray-400 hover:text-orange-500 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {expanded ? <><ChevronUp size={13} /> Collapse</> : <><ChevronDown size={13} /> Expand</>}
                </button>
              </div>
              <AnimatePresence>
                {expanded && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-3 overflow-hidden"
                  >
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${company.accentColor}15`, border: `1px solid ${company.accentColor}25` }}
                        >
                          <CheckCircle2 size={11} style={{ color: company.accentColor }} />
                        </div>
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Tech stack with icons */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 block">
                Technologies Used
              </span>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => {
                  const techData = TECH_ICONS[tech];
                  const TechIcon = techData?.Icon;
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:border-orange-400/50"
                      style={{
                        background: techData ? `${techData.bg}` : 'rgba(249,115,22,0.05)',
                        color: techData ? techData.color : '#f97316',
                        borderColor: techData ? `${techData.color}25` : 'rgba(249,115,22,0.2)',
                      }}
                    >
                      {TechIcon && <TechIcon style={{ fontSize: '12px' }} />}
                      {tech}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ── Main Experience Section ── */
const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-white dark:bg-[#030303] overflow-hidden relative">
      {/* Subtle glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="section-badge mx-auto mb-4">
            <Briefcase size={11} /> Work Journey
          </div>
          <h2 className="section-heading text-gray-900 dark:text-white mb-4">
            Work <span className="gradient-orange">Experience</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Real-world production experience building and shipping features at funded startups and agencies.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="grid grid-cols-4 gap-3 mb-16 max-w-2xl mx-auto"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="bento-card p-4 text-center"
            >
              <div className="text-2xl font-display font-extrabold gradient-orange">{stat.value}</div>
              <div className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 mt-0.5 leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} isLast={i === experiences.length - 1} />
          ))}
        </div>

        {/* LinkedIn CTA */}
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
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-orange-400 hover:text-orange-500 transition-all group"
          >
            <FaLinkedin className="text-blue-600" size={16} />
            View Full Profile on LinkedIn
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
