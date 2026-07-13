"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { label: 'Home',       sectionId: 'home',       lineKey: 'home'       },
  { label: 'Services',   sectionId: 'services',   lineKey: 'services'   },
  { label: 'Projects',   sectionId: 'projects',   lineKey: 'projects'   },
  { label: 'Experience', sectionId: 'experience', lineKey: 'experience' },
  { label: 'About Me',   sectionId: 'about',      lineKey: 'aboutme'    },
];

const Navbar = () => {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeSection, setActive]    = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_ITEMS.map(n => ({ id: n.sectionId, key: n.lineKey }));
      let maxH = 0, active = 'home';
      sections.forEach(({ id, key }) => {
        const el = document.getElementById(id);
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

  const scrollTo = (id, key) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActive(key);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-[Poppins]">
      {/* ── Top Contact Bar ─────────────────────────────────── */}
      <div className="bg-[#1a1a1a] dark:bg-[#0d0d0d] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          <div className="hidden md:flex items-center gap-6">
            <a href="mailto:grachit736@gmail.com"
               className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
              <FaEnvelope size={11} />
              grachit736@gmail.com
            </a>
            <span className="text-gray-600">|</span>
            <a href="tel:+919009634404"
               className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
              <FaPhone size={11} />
              +91-9009634404
            </a>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <a href="https://github.com/Rachit3784" target="_blank" rel="noopener noreferrer"
               className="hover:text-orange-400 transition-colors">
              <FaGithub size={14} />
            </a>
            <a href="https://www.linkedin.com/in/rachit-gupta-099999261" target="_blank" rel="noopener noreferrer"
               className="hover:text-orange-400 transition-colors">
              <FaLinkedin size={14} />
            </a>
            <button
              onClick={() => scrollTo('contact', 'contact')}
              className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded text-[11px] tracking-wide transition-colors cursor-pointer">
              Hire Me ↗
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ─────────────────────────────────────── */}
      <nav className={`transition-all duration-300 ${
        scrolled
          ? 'bg-white dark:bg-gray-950 shadow-md'
          : 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm'
      } border-b border-gray-100 dark:border-gray-800`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('home', 'home')}>
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-orange-500 ring-offset-1">
                <Image src="/Profile.jpg" alt="Rachit Gupta" fill className="object-cover" priority />
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                  RACHIT <span className="text-orange-500">GUPTA</span>
                </div>
                <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 -mt-0.5 tracking-widest uppercase">
                  Full-Stack Engineer
                </div>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <div key={item.lineKey} className="relative">
                  <button
                    onClick={() => scrollTo(item.sectionId, item.lineKey)}
                    className={`relative px-4 py-5 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                      activeSection === item.lineKey
                        ? 'text-orange-500'
                        : 'text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.lineKey && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-orange-500 rounded-t-full" />
                    )}
                  </button>
                </div>
              ))}

              <a href="https://github.com/Rachit3784" target="_blank" rel="noopener noreferrer"
                 className="px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5 ml-2">
                <FaGithub size={16} /> GitHub
              </a>

              <button
                onClick={() => scrollTo('contact', 'contact')}
                className="saas-btn-primary ml-3 !py-2.5 !px-5 !text-sm cursor-pointer">
                Contact Me
              </button>
              <div className="ml-2"><ThemeToggle /></div>
            </div>

            {/* Mobile toggle */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 py-4">
            <div className="px-4 space-y-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.lineKey}
                  onClick={() => scrollTo(item.sectionId, item.lineKey)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    activeSection === item.lineKey
                      ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}>
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contact', 'contact')}
                className="w-full mt-3 saas-btn-primary !justify-center">
                Contact Me
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;