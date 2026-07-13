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
          <div className="saas-section-badge mx-auto mb-4">
            Engineering Profile
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            About <span className="gradient-orange">Me</span>
          </h2>
          <div className="h-1 w-16 bg-orange-500 mx-auto rounded-full" />
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
              <p className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed font-semibold">
                I&apos;m a <span className="font-extrabold text-gray-900 dark:text-white">Full-Stack Engineer (2026 Batch)</span> specializing as a <span className="font-extrabold text-orange-500">Next.js Developer</span>, <span className="font-extrabold text-gray-900 dark:text-white">React Native Developer</span>, <span className="font-extrabold text-gray-900 dark:text-white">Web Developer</span>, and <span className="font-extrabold text-gray-900 dark:text-white">App Developer</span>.
              </p>
              
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                Currently pursuing B.Tech in Computer Science Engineering at <strong>Gyan Ganga College of Technology, Jabalpur</strong> (CGPA: <strong>7.53 / 10</strong>, 2022–2026). I build live web applications on Vercel using Next.js 16 App Router & TypeScript, and architect mobile applications using React Native with clean, layered backend code (Controller-Service-Repository pattern).
              </p>

              {/* Roles Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Next.js Developer', 'React Native Developer', 'Web Developer', 'App Developer', 'Full Stack Engineer'].map((role, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 text-xs font-bold rounded-lg border border-orange-100 dark:border-orange-900/40">
                    ✓ {role}
                  </span>
                ))}
              </div>

              {/* Achievement & Merit Highlight */}
              <div className="p-4 bg-[#fafafa] dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded-xl">
                <p className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
                  🏆 Merit Scholarship: 80% Tuition Fee Waiver (TFW Award)
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">
                  Awarded one of a limited number of merit-based TFW seats institute-wide, earned via top entrance-exam percentile.
                </p>
              </div>

              {/* Core Stack */}
              <div className="py-5 px-6 bg-[#fafafa] dark:bg-[#0a0a0a] rounded-2xl border border-gray-200 dark:border-zinc-800">
                <p className="text-xs text-orange-500 uppercase tracking-wider font-extrabold mb-3">
                  Core Engineering Stack
                </p>
                <div className="flex flex-wrap gap-5 items-center">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span className="font-extrabold text-orange-500 text-sm">Next.js 16</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <FaReact className="text-orange-500 text-xl" />
                    <span className="font-extrabold text-sm">React / React Native</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <SiMongodb className="text-emerald-500 text-xl" />
                    <span className="font-extrabold text-sm">MongoDB Atlas</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <SiNodedotjs className="text-emerald-600 text-xl" />
                    <span className="font-extrabold text-sm">Node.js / Express</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                With hands-on experience in <strong>TypeScript</strong>, <strong>Zustand</strong>, <strong>WebRTC</strong>, <strong>Firebase</strong>, <strong>Razorpay</strong>, and <strong>JWT Auth</strong>, I am ready to collaborate directly with founders to ship scalable features and optimize REST APIs from day one.
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
              <div className="absolute inset-0 bg-orange-400 rounded-full blur-2xl opacity-15"></div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative w-64 h-64 rounded-full overflow-hidden ring-4 ring-orange-500 ring-offset-4 shadow-xl"
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
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="saas-btn-primary text-center justify-center !py-3.5"
              >
                Get in Touch
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="/Resume.pdf"
                className="saas-btn-outline text-center justify-center !py-3.5"
              >
                Download Resume
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mt-8">
              <a href="https://www.linkedin.com/in/rachit-gupta-099999261" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <FaLinkedin size={18} />
              </a>
              <a href="https://github.com/Rachit3784" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <FaGithub size={18} />
              </a>
              <a href="https://www.instagram.com/rac_hit384/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <FaInstagram size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
