// components/Projects.js — Auto-Scrolling Marquee Portfolio Showcase
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaPlay } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects.js';
import { X, ArrowRight, Star } from 'lucide-react';

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div className={`relative w-full ${isGDrive ? 'max-w-5xl aspect-video' : 'max-w-5xl'}`}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-orange-400 transition-colors p-2 cursor-pointer"
        >
          <X size={30} />
        </button>
        {isGDrive ? (
          <iframe
            src={videoUrl}
            className="w-full h-full rounded-2xl border border-white/10 shadow-2xl"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <video controls autoPlay className="w-full rounded-2xl border border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
            <source src={project.video} type="video/mp4" />
          </video>
        )}
      </div>
    </motion.div>
  );
};

/* ── Project Card Component ───────────────────────────── */
const ProjectCard = ({ project, onVideoClick }) => {
  const hasVideo = !!project.video?.trim();
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="w-80 sm:w-[380px] flex-shrink-0 saas-card flex flex-col justify-between overflow-hidden group h-full cursor-default">
      <div>
        {/* Image Container */}
        <div className="relative h-56 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
          {!imgErr ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgErr(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-semibold p-4 text-center">
              {project.title}
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 p-4">
            {hasVideo && (
              <button
                onClick={() => onVideoClick(project)}
                className="w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center shadow-xl text-white cursor-pointer transition-transform hover:scale-110"
                title="Play Demo Video"
              >
                <FaPlay className="ml-0.5" size={14} />
              </button>
            )}
            <Link
              href={`/projects/${project.id}`}
              className="px-4 py-2.5 bg-white hover:bg-orange-50 text-gray-900 text-xs font-bold rounded-xl shadow-xl flex items-center gap-1.5 transition-all"
            >
              View Details <ArrowRight size={14} />
            </Link>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-orange-500 text-white text-[10px] font-extrabold rounded-lg uppercase tracking-wider shadow-md">
              {project.category}
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white text-[10px] font-extrabold rounded-lg shadow flex items-center gap-1">
              <Star size={10} className="fill-orange-500 text-orange-500" /> 5.0
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-orange-500 transition-colors tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed font-normal">
            {project.shortDescription}
          </p>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-bold rounded-md border border-gray-200 dark:border-gray-700"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-0.5 bg-orange-50 dark:bg-orange-950/30 text-orange-500 text-[10px] font-bold rounded-md border border-orange-100 dark:border-orange-900/40">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-6 pb-6 pt-0">
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
          >
            <FaGithub size={15} /> Source Code
          </a>
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-all shadow-sm"
            >
              <FaExternalLinkAlt size={10} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Hardware Accelerated Projects Marquee ───────────── */
const ProjectsMarquee = ({ items, onVideoClick }) => {
  const multiplied = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden w-full py-4">
      <div className="flex gap-6 w-max animate-marquee-slow">
        {multiplied.map((project, i) => (
          <ProjectCard key={i} project={project} onVideoClick={onVideoClick} />
        ))}
      </div>
    </div>
  );
};

const CATEGORIES = [
  { id: 'ALL',       name: 'All Projects' },
  { id: 'NEXTJS',   name: 'Next.js Web Apps' },
  { id: 'MOBILE',   name: 'React Native' },
  { id: 'FULLSTACK',name: 'Full-Stack & APIs' },
];

const Projects = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('ALL');

  const filtered = projects.filter(p => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'NEXTJS') return p.technologies.some(t => t.toLowerCase().includes('next'));
    if (activeTab === 'MOBILE') return p.technologies.some(t => t.toLowerCase().includes('native'));
    if (activeTab === 'FULLSTACK') return p.category?.toLowerCase().includes('stack') || p.category?.toLowerCase().includes('mern');
    return true;
  });

  return (
    <section id="projects" className="py-24 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="saas-section-badge mx-auto mb-4">
            Portfolio Showcase
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Featured <span className="gradient-orange">Projects</span>
          </h2>
          <div className="h-1 w-16 bg-orange-500 mx-auto rounded-full mb-5" />
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base">
            Auto-scrolling project marquee · Hover to pause & interact with links
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto hide-scrollbar pb-2">
          <div className="inline-flex p-1.5 bg-[#fafafa] dark:bg-[#0a0a0a] rounded-2xl border border-gray-200 dark:border-zinc-800 gap-1.5">
            {CATEGORIES.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Projects Horizontal Auto-Scrolling Marquee */}
      <ProjectsMarquee items={filtered} onVideoClick={setActiveVideo} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bottom GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/Rachit3784"
            target="_blank"
            rel="noopener noreferrer"
            className="saas-btn-primary inline-flex"
          >
            <FaGithub size={18} /> Explore Full GitHub Repositories
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