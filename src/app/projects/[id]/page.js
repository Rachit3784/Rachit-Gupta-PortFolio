// app/projects/[id]/page.js — Immersive Project Detail Page
"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import {
  SiNextdotjs, SiReact, SiNodedotjs, SiMongodb, SiTypescript,
  SiFirebase, SiExpress, SiVercel, SiRedux,
} from 'react-icons/si';
import { motion } from 'framer-motion';
import { projects } from '../../../data/projects';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Layers, Star, Code2 } from 'lucide-react';

/* ── Tech icon map ── */
const TECH_ICONS = {
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
  'Redux':         { Icon: SiRedux,     color: '#fff',    bg: '#764ABC' },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const ProjectDetail = () => {
  const params  = useParams();
  const router  = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgErr, setImgErr]   = useState(false);

  useEffect(() => {
    if (params.id) {
      const found = projects.find(p => p.id === params.id);
      if (found) setProject(found);
      else router.push('/');
      setLoading(false);
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030303]">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 rounded-full border-2 border-orange-500/20 border-t-orange-500"
          />
          <span className="text-sm text-gray-500">Loading project...</span>
        </div>
      </div>
    );
  }

  if (!project) return null;

  /* Parse description into bullet points & paragraphs */
  const descLines = project.fullDescription
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  const bullets = descLines.filter(l => l.startsWith('-'));
  const paras   = descLines.filter(l => !l.startsWith('-') && l.length > 15);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#030303]">

      {/* ── Hero Image Section ── */}
      <div className="relative h-[55vh] min-h-[340px] w-full overflow-hidden bg-[#0d0d0d]">
        {!imgErr ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-60"
            onError={() => setImgErr(true)}
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-500/10 to-black flex items-center justify-center">
            <Layers size={80} className="text-orange-500/20" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            {/* Back button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 mb-5 text-white/60 hover:text-white text-sm font-medium transition-colors cursor-pointer group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </button>

            {/* Category badge */}
            <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-lg mb-3">
              {project.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight tracking-tight mb-4">
              {project.title}
            </h1>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mt-2">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-all"
                >
                  <FaGithub size={14} /> View Code
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30"
                >
                  <FaExternalLinkAlt size={12} /> Live Demo
                </a>
              )}
              <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm">
                <Star size={13} className="fill-orange-500 text-orange-500" />
                <span className="font-semibold">5.0</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left: Main description */}
          <div className="lg:col-span-2 space-y-8">

            {/* Overview */}
            <motion.div variants={itemVariants} className="bento-card p-8">
              <h2 className="text-lg font-display font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <Code2 size={18} className="text-orange-500" />
                Project Overview
              </h2>
              <div className="space-y-3">
                {paras.map((para, i) => (
                  <p key={i} className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Key features */}
            {bullets.length > 0 && (
              <motion.div variants={itemVariants} className="bento-card p-8">
                <h2 className="text-lg font-display font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-orange-500" />
                  Key Technical Highlights
                </h2>
                <ul className="space-y-4">
                  {bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                      <div className="w-5 h-5 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={11} className="text-orange-500" />
                      </div>
                      <span>{bullet.replace(/^-\s*/, '').replace(/^[A-Za-z ]+:\s*/, match => (
                        `${match}`
                      ))}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">

            {/* Tech stack */}
            <motion.div variants={itemVariants} className="bento-card p-6">
              <h3 className="text-sm font-display font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                Tech Stack
              </h3>
              <div className="space-y-2">
                {project.technologies.map((tech, i) => {
                  const t = TECH_ICONS[tech];
                  const TechIcon = t?.Icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="flex items-center gap-3 py-2 px-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-orange-400/30 transition-colors group"
                    >
                      {TechIcon ? (
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: t.bg }}
                        >
                          <TechIcon style={{ color: t.color, fontSize: '13px' }} />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                          <Code2 size={12} className="text-orange-500" />
                        </div>
                      )}
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover:text-orange-500 transition-colors">{tech}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick links */}
            <motion.div variants={itemVariants} className="bento-card p-6">
              <h3 className="text-sm font-display font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                Quick Links
              </h3>
              <div className="space-y-2.5">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 py-3 px-4 rounded-xl bg-gray-900 dark:bg-white/5 text-white text-xs font-semibold hover:bg-orange-500 transition-all group"
                  >
                    <FaGithub size={14} />
                    View Source Code
                    <ExternalLink size={11} className="ml-auto opacity-40 group-hover:opacity-100" />
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 py-3 px-4 rounded-xl bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition-all group shadow-md shadow-orange-500/20"
                  >
                    <ExternalLink size={14} />
                    Open Live Demo
                    <ExternalLink size={11} className="ml-auto opacity-60 group-hover:opacity-100" />
                  </a>
                )}
                <button
                  onClick={() => router.back()}
                  className="w-full flex items-center gap-3 py-3 px-4 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 text-xs font-semibold hover:border-orange-400 hover:text-orange-500 transition-all cursor-pointer group"
                >
                  <ArrowLeft size={14} />
                  Back to Projects
                </button>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;