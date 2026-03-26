// components/Projects.js
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaPlay } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects.js';
import { X } from 'lucide-react';

// Helper to convert Google Drive view URL to embed URL
const getGoogleDriveEmbedUrl = (url) => {
  if (!url) return null;
  const match = url.match(/\/d\/(.*?)\/view/);
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return url;
};

const VideoPlayer = ({ project, onClose }) => {
  const isGDrive = project.videoType === 'gdrive';
  const videoUrl = isGDrive ? getGoogleDriveEmbedUrl(project.video) : project.video;

  if (isGDrive && videoUrl) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        onClick={onClose}
      >
        <div className="relative w-full max-w-5xl aspect-video">
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition-colors"
          >
            <X size={32} />
          </button>
          <iframe
            src={videoUrl}
            className="w-full h-full rounded-lg"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition-colors"
        >
          <X size={32} />
        </button>
        <video
          controls
          autoPlay
          className="w-full rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <source src={project.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, onVideoClick }) => {
  const hasVideo = project.video && project.video.trim() !== '';

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-700"
    >
      <div className="relative h-56 w-full overflow-hidden group">
        {project.type === "image" ? (
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            className="transition-transform duration-500 group-hover:scale-110"
          />
        ) : hasVideo ? (
          <>
            <Image
              src={project.image}
              alt={project.title}
              layout="fill"
              className="transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => onVideoClick(project)}
                className="w-16 h-16 bg-black/80 dark:bg-yellow-400/90 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300 hover:bg-black dark:hover:bg-yellow-400"
              >
                <FaPlay className="text-white dark:text-black ml-1 text-xl" />
              </button>
            </div>
          </>
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            className="transition-transform duration-500 group-hover:scale-110"
          />
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-black/80 dark:bg-yellow-400/90 text-white dark:text-black text-xs font-semibold rounded-full backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 text-xs font-medium rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          <Link
            href={`/projects/${project.id}`}
            className="text-sm font-semibold text-gray-900 dark:text-yellow-400 hover:text-black dark:hover:text-yellow-300 transition-colors flex items-center gap-1"
          >
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <div className="flex space-x-3">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-yellow-400 transition-colors"
            >
              <FaGithub size={20} />
            </a>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-yellow-400 transition-colors"
              >
                <FaExternalLinkAlt size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-1 w-24 bg-black dark:bg-yellow-400 mx-auto rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Showcasing my expertise in React Native, MERN Stack, and Full-Stack Development
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard
                project={project}
                onVideoClick={setActiveVideo}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/Rachit3784"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-yellow-400 text-white dark:text-black font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-yellow-300 transition-all duration-300 hover:scale-105"
          >
            <FaGithub size={20} />
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <VideoPlayer
            project={activeVideo}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;