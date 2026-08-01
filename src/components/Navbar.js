"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Menu, X, ChevronRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Home',       sectionId: 'home',       key: 'home'       },
  { label: 'Skills',     sectionId: 'services',   key: 'services'   },
  { label: 'Projects',   sectionId: 'projects',   key: 'projects'   },
  { label: 'Experience', sectionId: 'experience', key: 'experience' },
  { label: 'About',      sectionId: 'about',      key: 'aboutme'    },
];

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActive]  = useState('home');
  const [mounted, setMounted]       = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      let maxH = 0, active = 'home';
      NAV_ITEMS.forEach(({ sectionId, key }) => {
        const el = document.getElementById(sectionId);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const h = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        if (h > maxH && h > 0) { maxH = h; active = key; }
      });
      setActive(active);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  if (!mounted) return null;

  return (
    <>
      {/* ── Floating Pill Navbar ── */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4"
      >
        <nav className={`glass-navbar rounded-full px-3 py-2 flex items-center gap-2 w-full max-w-3xl transition-all duration-300 ${
          scrolled ? 'shadow-lg shadow-black/10 dark:shadow-black/40' : ''
        }`}>

          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2.5 mr-2 group cursor-pointer"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-orange-500/60 group-hover:ring-orange-500 transition-all duration-300 animate-glowPulse flex-shrink-0">
              <Image src="/Profile.jpg" alt="Rachit Gupta" fill className="object-cover" priority />
            </div>
            <span className="hidden sm:block font-display font-800 text-sm text-gray-900 dark:text-white tracking-tight">
              Rachit<span className="text-orange-500">.</span>
            </span>
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-black/10 dark:bg-white/10 flex-shrink-0" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.key}
                onClick={() => scrollTo(item.sectionId)}
                className={`relative px-3.5 py-2 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  activeSection === item.key
                    ? 'text-orange-500 bg-orange-50 dark:bg-orange-500/10'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
                {activeSection === item.key && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-orange-50 dark:bg-orange-500/10 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">
            <a
              href="https://github.com/Rachit3784"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex w-8 h-8 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              <FaGithub size={15} />
            </a>
            <a
              href="https://www.linkedin.com/in/rachit-gupta-099999261"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex w-8 h-8 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all"
            >
              <FaLinkedin size={15} />
            </a>
            <ThemeToggle />
            <button
              onClick={() => scrollTo('contact')}
              className="hidden md:inline-flex btn-primary !py-2 !px-5 !text-xs !rounded-full"
            >
              Hire Me <ChevronRight size={13} />
            </button>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.span key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.2}}><X size={18} /></motion.span>
                  : <motion.span key="m" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.2}}><Menu size={18} /></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="fixed top-20 left-4 right-4 z-50 glass-navbar rounded-2xl p-4 shadow-2xl"
            >
              <div className="space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.key}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollTo(item.sectionId)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                      activeSection === item.key
                        ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-500'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                    <ChevronRight size={14} className="text-gray-400" />
                  </motion.button>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 flex items-center gap-3">
                <button
                  onClick={() => scrollTo('contact')}
                  className="flex-1 btn-primary !py-2.5 !text-sm justify-center"
                >
                  Hire Me
                </button>
                <a href="https://github.com/Rachit3784" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300"
                >
                  <FaGithub size={16} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;