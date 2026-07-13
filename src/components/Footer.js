// components/Footer.js
"use client";
import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Home',       id: 'home'       },
  { label: 'Services',   id: 'services'   },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Experience', id: 'experience' },
  { label: 'About Me',   id: 'about'      },
  { label: 'Contact',    id: 'contact'    },
];

const SERVICES_LIST = [
  'Next.js 16 Web Apps',
  'React Native Mobile',
  'REST API Development',
  'MongoDB & Database',
  'TypeScript Projects',
  'Full-Stack Engineering',
];

const Footer = () => {
  const year = new Date().getFullYear();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-black text-white font-[Poppins] border-t border-zinc-800">

      {/* CTA Banner */}
      <div className="bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-white">Ready to start a project?</h3>
            <p className="text-orange-100 text-sm font-medium mt-1">
              Let's build something great together — get in touch today!
            </p>
          </div>
          <button
            onClick={() => scrollTo('contact')}
            className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-orange-600 font-bold rounded-lg transition-all hover:shadow-lg whitespace-nowrap cursor-pointer">
            Get In Touch <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-black mb-2">
              RACHIT <span className="text-orange-500">GUPTA</span>
            </h2>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Full-Stack Engineer
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              2026 Batch engineer specializing in Next.js 16, React Native, TypeScript, and MongoDB Atlas. 
              Building production-grade web & mobile apps.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { href: 'https://github.com/Rachit3784',                         icon: <FaGithub size={16} /> },
                { href: 'https://www.linkedin.com/in/rachit-gupta-099999261',    icon: <FaLinkedin size={16} /> },
                { href: 'https://www.instagram.com/rac_hit384/',                  icon: <FaInstagram size={16} /> },
                { href: 'mailto:grachit736@gmail.com',                            icon: <FaEnvelope size={16} /> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 bg-[#0a0a0a] border border-zinc-800 hover:bg-orange-500 hover:border-orange-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300">
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5 pb-3 border-b border-zinc-800">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 group cursor-pointer">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5 pb-3 border-b border-zinc-800">
              Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICES_LIST.map((s, i) => (
                <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="w-1 h-1 bg-orange-500 rounded-full flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5 pb-3 border-b border-zinc-800">
              Contact
            </h4>
            <div className="space-y-4">
              <a href="mailto:grachit736@gmail.com"
                 className="flex items-start gap-3 text-sm text-gray-400 hover:text-orange-500 transition-colors group">
                <FaEnvelope size={14} className="mt-0.5 flex-shrink-0 text-orange-500" />
                grachit736@gmail.com
              </a>
              <a href="tel:+919009634404"
                 className="flex items-start gap-3 text-sm text-gray-400 hover:text-orange-500 transition-colors">
                <FaPhone size={14} className="mt-0.5 flex-shrink-0 text-orange-500" />
                +91-9009634404
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-orange-500" />
                Jabalpur, Madhya Pradesh, India
              </div>
            </div>

            {/* Resume Download */}
            <a href="/Resume.pdf" download
               className="mt-6 flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-all w-fit">
              Download Resume ↓
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {year} Rachit Gupta. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-gray-500">
              Built with <span className="text-orange-500 font-bold">Next.js 16</span> & <span className="text-orange-500 font-bold">React</span>
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-md transition-all cursor-pointer">
              ↑ Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;