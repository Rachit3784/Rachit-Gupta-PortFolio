// components/Projects.js — Cinematic Project Showcase
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaPlay } from 'react-icons/fa';
import {
  SiNextdotjs, SiReact, SiNodedotjs, SiMongodb, SiTypescript,
  SiFirebase, SiExpress, SiVercel,
} from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects.js';
import { X, ArrowRight, Star, Layers, ArrowUpRight, Sparkles } from 'lucide-react';

/* ── Tech icon map ── */
const TECH_ICONS_MAP = {
  'Next.js 16':    { Icon: SiNextdotjs,  color: '#fff',    bg: '#000'    },
  'React Native':  { Icon: SiReact,      color: '#61DAFB', bg: '#0d1117' },
  'React.js':      { Icon: SiReact,      color: '#61DAFB', bg: '#0d1117' },
  'Node.js':       { Icon: SiNodedotjs, color: '#339933', bg: '#0d1f0d' },
  'MongoDB Atlas': { Icon: SiMongodb,   color: '#47A248', bg: '#0d1f0d' },
  'MongoDB':       { Icon: SiMongodb,   color: '#47A248', bg: '#0d1f0d' },
  'TypeScript':    { Icon: SiTypescript,color: '#fff',    bg: '#3178C6' },
  'Express.js':    { Icon: SiExpress,   color: '#ccc',    bg: '#111'    },
  'Firebase':      { Icon: SiFirebase,  color: '#FFCA28', bg: '#1a1a0a' },
  'Vercel':        { Icon: SiVercel,    color: '#fff',    bg: '#000'    },
};

const getGdriveEmbed = (url) => {
  if (!url) return null;
  const m = url.match(/\/d\/(.*?)\/view/);
  return m ? `https://drive.google.com/file/d/${m[1]}/preview` : url;
};

/* ── Video Modal ── */
const VideoModal = ({ project, onClose }) => {
  const isGDrive = project.videoType === 'gdrive';
  const videoUrl = isGDrive ? getGdriveEmbed(project.video) : project.video;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        className="relative w-full max-w-5xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
        >
          <X size={18} />
        </button>
        {/* Cinema-style header */}
        <div className="bg-black/80 border border-white/10 rounded-t-2xl px-6 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs text-white/50 font-mono">{project.title}</span>
        </div>
        <div className="aspect-video bg-black rounded-b-2xl overflow-hidden border border-white/10 border-t-0">
          {isGDrive ? (
            <iframe src={videoUrl} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
          ) : (
            <video controls autoPlay className="w-full h-full">
              <source src={project.video} type="video/mp4" />
            </video>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Project Card ── */
const ProjectCard = ({ project, onVideoClick, isFeatured = false }) => {
  const hasVideo = !!project.video?.trim();
  const [imgErr, setImgErr] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`premium-card flex flex-col overflow-hidden group ${isFeatured ? 'md:col-span-2' : ''}`}
    >
      {/* Image */}
      <div className={`relative w-full overflow-hidden ${isFeatured ? 'h-64' : 'h-48'} bg-gray-100 dark:bg-[#111]`}>
        {!imgErr ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-orange-600/5">
            <Layers size={40} className="text-orange-500/30" />
          </div>
        )}

        {/* Overlay on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center gap-3 p-4"
            >
              {hasVideo && (
                <motion.button
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  onClick={() => onVideoClick(project)}
                  className="w-14 h-14 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/40 text-white cursor-pointer transition-colors"
                >
                  <FaPlay className="ml-0.5" size={16} />
                </motion.button>
              )}
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                <Link
                  href={`/projects/${project.id}`}
                  className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-orange-50 text-gray-900 text-xs font-bold rounded-xl shadow-xl transition-all"
                >
                  View Details <ArrowRight size={13} />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 bg-black/80 backdrop-blur-sm text-orange-400 text-[10px] font-bold rounded-lg border border-orange-500/20">
            {project.category}
          </span>
          {isFeatured && (
            <span className="px-2.5 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-lg">
              Featured
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1 px-2 py-1 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold rounded-lg">
            <Star size={9} className="fill-orange-500 text-orange-500" /> 5.0
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-base font-display font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors leading-snug line-clamp-2">
          {project.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2 flex-1">
          {project.shortDescription}
        </p>

        {/* Tech icons */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {project.technologies.slice(0, 5).map((tech, i) => {
            const t = TECH_ICONS_MAP[tech];
            if (!t) return (
              <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 font-semibold border border-gray-200 dark:border-white/5">{tech}</span>
            );
            const { Icon, color, bg } = t;
            return (
              <div
                key={i}
                title={tech}
                className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: bg }}
              >
                <Icon style={{ color, fontSize: '12px' }} />
              </div>
            );
          })}
          {project.technologies.length > 5 && (
            <span className="text-[10px] font-bold text-orange-500">+{project.technologies.length - 5}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
          >
            <FaGithub size={14} /> Code
          </a>
          <div className="flex items-center gap-2">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-all shadow-sm shadow-orange-500/20"
              >
                <FaExternalLinkAlt size={9} /> Live
              </a>
            )}
            <Link
              href={`/projects/${project.id}`}
              className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
            >
              Details <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Category tabs ── */
const CATEGORIES = [
  { id: 'ALL',        name: 'All'           },
  { id: 'NEXTJS',     name: 'Next.js'       },
  { id: 'MOBILE',     name: 'Mobile'        },
  { id: 'FULLSTACK',  name: 'Full-Stack'    },
];

/* ── Main Projects ── */
const Projects = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeTab, setActiveTab]     = useState('ALL');

  const filtered = projects.filter(p => {
    if (activeTab === 'ALL')        return true;
    if (activeTab === 'NEXTJS')     return p.technologies.some(t => t.toLowerCase().includes('next'));
    if (activeTab === 'MOBILE')     return p.technologies.some(t => t.toLowerCase().includes('native'));
    if (activeTab === 'FULLSTACK')  return p.category?.toLowerCase().includes('stack') || p.category?.toLowerCase().includes('mern');
    return true;
  });

  return (
    <section id="projects" className="py-24 bg-gray-50/30 dark:bg-[#030303] overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <div className="section-badge mx-auto mb-4">
            <Sparkles size={11} /> Portfolio
          </div>
          <h2 className="section-heading text-gray-900 dark:text-white mb-4">
            Featured <span className="gradient-orange">Projects</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Production-grade apps built and shipped across web and mobile platforms.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1.5 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 gap-1">
            {CATEGORIES.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-orange-500 rounded-xl shadow-md shadow-orange-500/25"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="relative z-10">{tab.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard
                  project={project}
                  onVideoClick={setActiveVideo}
                  isFeatured={i === 0 && activeTab === 'ALL'}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <a
            href="https://github.com/Rachit3784"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <FaGithub size={16} />
            Explore All GitHub Repos
            <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && <VideoModal project={activeVideo} onClose={() => setActiveVideo(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;