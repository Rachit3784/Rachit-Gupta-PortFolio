// components/Projects.js — Apple Invite-style Horizontal Auto-Scroll Carousel
"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaPlay } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects.js';
import { X, ArrowRight } from 'lucide-react';

const getGoogleDriveEmbedUrl = (url) => {
  if (!url) return null;
  const match = url.match(/\/d\/(.*?)\/view/);
  if (match?.[1]) return `https://drive.google.com/file/d/${match[1]}/preview`;
  return url;
};

const VideoPlayer = ({ project, onClose }) => {
  const isGDrive = project.videoType === 'gdrive';
  const videoUrl = isGDrive ? getGoogleDriveEmbedUrl(project.video) : project.video;
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4"
      onClick={onClose}
    >
      <div className={`relative w-full ${isGDrive ? 'max-w-5xl aspect-video' : 'max-w-5xl'}`}>
        <button onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-orange-400 transition-colors">
          <X size={32} />
        </button>
        {isGDrive
          ? <iframe src={videoUrl} className="w-full h-full rounded-xl" allow="autoplay; encrypted-media" allowFullScreen />
          : <video controls autoPlay className="w-full rounded-xl" onClick={e => e.stopPropagation()}>
              <source src={project.video} type="video/mp4" />
            </video>
        }
      </div>
    </motion.div>
  );
};

/* ── Single Project Card ─────────────────────────────── */
const ProjectCard = ({ project, onVideoClick }) => {
  const hasVideo = !!project.video?.trim();
  const [imgErr, setImgErr] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-80 sm:w-96 saas-card overflow-hidden snap-start"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-52 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {!imgErr ? (
          <Image
            src={project.image} alt={project.title} fill
            className="object-cover transition-transform duration-500"
            style={{ transform: hovered ? 'scale(1.07)' : 'scale(1)' }}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium">
            {project.title}
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 bg-black/55 flex items-center justify-center gap-3 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          {hasVideo && (
            <button
              onClick={() => onVideoClick(project)}
              className="w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center shadow-xl transition-transform"
              style={{ transform: hovered ? 'scale(1)' : 'scale(0.8)' }}
            >
              <FaPlay className="text-white ml-0.5" size={14} />
            </button>
          )}
          <Link
            href={`/projects/${project.id}`}
            className="px-4 py-2 bg-white hover:bg-orange-50 text-gray-900 text-xs font-bold rounded-lg shadow-xl flex items-center gap-1.5 transition-transform"
            style={{ transform: hovered ? 'scale(1)' : 'scale(0.8)' }}
          >
            View Details <ArrowRight size={12} />
          </Link>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-orange-500 text-white text-[10px] font-bold rounded uppercase tracking-wide shadow">
            {project.category}
          </span>
        </div>
        {/* Rating */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 bg-white/90 text-gray-900 text-[10px] font-black rounded shadow flex items-center gap-1">
            ★ 5.0
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3
          className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 transition-colors"
          style={{ color: hovered ? '#f97316' : undefined }}
        >
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((t, i) => (
            <span key={i}
              className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-semibold rounded border border-gray-200 dark:border-gray-700">
              {t}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 bg-orange-50 dark:bg-orange-950/30 text-orange-500 text-[10px] font-semibold rounded border border-orange-100 dark:border-orange-900/40">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors">
            <FaGithub size={14} /> Source
          </a>
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-all">
              <FaExternalLinkAlt size={10} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Draggable Auto-Scroll Carousel ─────────────────── */
const ProjectCarousel = ({ onVideoClick }) => {
  const ref = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const autoTimer = useRef(null);
  const [paused, setPaused] = useState(false);

  const stopAuto = () => clearInterval(autoTimer.current);
  const startAuto = () => {
    stopAuto();
    autoTimer.current = setInterval(() => {
      if (!ref.current || paused) return;
      ref.current.scrollLeft += 1;
      const { scrollLeft: sl, scrollWidth, clientWidth } = ref.current;
      if (sl >= (scrollWidth - clientWidth) * 0.5) {
        ref.current.scrollLeft = 0;
      }
    }, 16);
  };

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [paused]);

  const doubled = [...projects, ...projects];

  return (
    <div className="relative">
      <div
        ref={ref}
        onMouseDown={(e) => {
          isDragging.current = true;
          stopAuto();
          startX.current = e.pageX - ref.current.offsetLeft;
          scrollLeft.current = ref.current.scrollLeft;
        }}
        onMouseLeave={() => { isDragging.current = false; startAuto(); setPaused(false); }}
        onMouseUp={() => { isDragging.current = false; startAuto(); }}
        onMouseMove={(e) => {
          if (!isDragging.current) return;
          e.preventDefault();
          const x = e.pageX - ref.current.offsetLeft;
          ref.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.8;
        }}
        onMouseEnter={() => { stopAuto(); setPaused(true); }}
        className="flex gap-5 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing pb-4 snap-x"
        style={{ userSelect: 'none' }}
      >
        {doubled.map((project, i) => (
          <ProjectCard key={i} project={project} onVideoClick={onVideoClick} />
        ))}
      </div>
      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
        style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 dark:hidden"
        style={{ background: 'linear-gradient(to left, #ffffff, transparent)' }} />
    </div>
  );
};

/* ── Section ─────────────────────────────────────────── */
const Projects = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-[#0d0f1a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="saas-section-badge mx-auto mb-4">Portfolio Showcase</div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Featured <span className="gradient-orange">Projects</span>
          </h2>
          <div className="h-1 w-16 bg-orange-500 mx-auto rounded-full mb-5" />
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base">
            Drag to explore · Live Next.js 16 web apps, React Native mobile platforms & backend architectures
          </p>
        </motion.div>

        {/* Carousel */}
        <ProjectCarousel onVideoClick={setActiveVideo} />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a href="https://github.com/Rachit3784" target="_blank" rel="noopener noreferrer"
            className="saas-btn-primary inline-flex">
            <FaGithub size={18} /> View Full GitHub Codebase
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeVideo && <VideoPlayer project={activeVideo} onClose={() => setActiveVideo(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;