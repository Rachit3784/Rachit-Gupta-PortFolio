"use client";
import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { SiReact, SiMongodb, SiExpress, SiNodedotjs } from 'react-icons/si';
import { motion } from 'framer-motion';

import Image from 'next/image';

const AboutMe = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-1 w-24 bg-black dark:bg-yellow-400 mx-auto rounded-full"
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Side - Bio */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 max-w-2xl"
          >
            <div className="space-y-6">
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                I&apos;m a passionate <span className="font-bold text-gray-900 dark:text-yellow-400">Software Developer</span> and <span className="font-bold text-gray-900 dark:text-yellow-400">Application Developer</span> specializing in React Native and MERN Stack development.
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Currently in my final year of B.Tech CSE at Gyan Ganga College of Technology, I build production-ready mobile applications and full-stack web solutions. My expertise spans from React Native mobile apps with complex state management to scalable MERN stack applications with secure authentication.
              </p>

              {/* MERN Stack Highlight */}
              <div className="py-6 px-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-4">
                  Core Stack
                </p>
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <SiMongodb className="text-green-500 text-2xl" />
                    <span className="font-medium">MongoDB</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <SiExpress className="text-gray-600 dark:text-gray-400 text-2xl" />
                    <span className="font-medium">Express.js</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <FaReact className="text-blue-500 text-2xl" />
                    <span className="font-medium">React / React Native</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <SiNodedotjs className="text-green-600 text-2xl" />
                    <span className="font-medium">Node.js</span>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                With hands-on experience in <strong>Redux</strong>, <strong>Zustand</strong>, <strong>Firebase</strong>, and <strong>REST APIs</strong>, I create seamless user experiences backed by robust architecture. I&apos;m actively seeking opportunities to contribute to innovative projects.
              </p>
            </div>
          </motion.div>

          {/* Right Side - Profile */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-shrink-0 flex flex-col items-center"
          >
            {/* Profile Image */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-black dark:bg-yellow-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800 shadow-2xl"
              >
                <Image
                  src="/Profile.jpg"
                  alt="Rachit Gupta"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 w-64">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="text-center px-6 py-3 bg-black dark:bg-yellow-400 text-white dark:text-black font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-yellow-300 transition-all duration-300 shadow-lg"
              >
                Get in Touch
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/Resume.pdf"
                className="text-center px-6 py-3 border-2 border-black dark:border-yellow-400 text-black dark:text-yellow-400 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300"
              >
                Download Resume
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6 mt-8">
              <a
                href="https://www.linkedin.com/in/rachit-gupta-099999261"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black transition-all duration-300"
              >
                <FaLinkedin size={22} />
              </a>
              <a
                href="https://github.com/Rachit3784"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black transition-all duration-300"
              >
                <FaGithub size={22} />
              </a>
              <a
                href="https://www.instagram.com/rac_hit384/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black transition-all duration-300"
              >
                <FaInstagram size={22} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
