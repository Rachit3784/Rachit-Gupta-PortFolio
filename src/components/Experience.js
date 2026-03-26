// components/Experience.js
"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { experiences } from '../data/experience';
import { FaCalendarAlt, FaMapMarkerAlt, FaBriefcase, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import { Award, Building2 } from 'lucide-react';

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      {/* Header with Company Logo and Role */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-6">
        {/* Company Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0 border border-gray-200 dark:border-gray-600 shadow-md"
        >
          <Image
            src={experience.companyLogo}
            alt={`${experience.company} logo`}
            fill
            className="object-contain p-2"
          />
        </motion.div>

        {/* Role and Company Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {experience.role}
            </h3>
            <span className="px-3 py-1 bg-black dark:bg-yellow-400 text-white dark:text-black text-sm font-semibold rounded-full">
              {experience.type}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
            <Building2 size={18} />
            <span className="font-semibold text-lg">{experience.company}</span>
          </div>

          {/* Duration and Location */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <FaCalendarAlt size={14} />
              <span>{experience.duration}</span>
              <span className="text-gray-400">·</span>
              <span className="font-medium text-gray-700 dark:text-gray-300">{experience.durationLabel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaMapMarkerAlt size={14} />
              <span>{experience.location}</span>
            </div>
          </div>
        </div>

        {/* Certificate Button */}
        {experience.certificate && (
          <motion.a
            href={experience.certificate}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-3 bg-black dark:bg-yellow-400 text-white dark:text-black font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-yellow-300 transition-all duration-300 shadow-lg"
          >
            <Award size={20} />
            <span>View Certificate</span>
            <FaExternalLinkAlt size={14} />
          </motion.a>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6"></div>

      {/* Description */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          Key Responsibilities & Achievements
        </h4>
        <ul className="space-y-3">
          {experience.description.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + idx * 0.1 }}
              className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
            >
              <span className="w-2 h-2 bg-black dark:bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
              <span className="leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Technologies */}
      <div>
        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Technologies Used
        </h4>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Work Experience
          </h2>
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
            Professional experience as a Software & Application Developer
          </motion.p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <a
            href="https://www.linkedin.com/in/rachit-gupta-099999261"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-black dark:border-yellow-400 text-black dark:text-yellow-400 font-semibold rounded-xl hover:bg-black hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black transition-all duration-300"
          >
            <FaBriefcase size={20} />
            View Full Profile on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
