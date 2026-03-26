"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import Image from 'next/image';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLine, setActiveLine] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // Change background when scrolled
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check which section is currently in the viewport
      const sections = [
        { id: 'home', name: 'home' },
        { id: 'experience', name: 'experience' },
        { id: 'services', name: 'services' },
        { id: 'projects', name: 'projects' },
        { id: 'about', name: 'aboutme' },
        { id: 'contact', name: 'contact' }
      ];

      // Find which section is most visible in the viewport
      let maxVisibleSection = null;
      let maxVisibleHeight = 0;

      sections.forEach(({ id, name }) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
          
          // If this section has more visible area than any previous one, it becomes the active section
          if (visibleHeight > maxVisibleHeight && visibleHeight > 0) {
            maxVisibleHeight = visibleHeight;
            maxVisibleSection = name;
          }
        }
      });

      // Update active line if we found a visible section
      if (maxVisibleSection) {
        setActiveLine(maxVisibleSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Run once on mount to set initial active section
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId, lineName) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveLine(lineName);
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg dark:bg-gray-900' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home', 'home')}>
            <Link href="/" className="text-2xl font-bold text-black dark:text-yellow-400">
              <div className="absolute bg-black dark:bg-yellow-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="relative rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                <Image
                  src="/Profile.jpg"
                  alt="Rachit Gupta"
                  width={45}
                  height={45}
                  className="object-cover"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              <div className="relative cursor-pointer">
                <button
                  onClick={() => scrollToSection('home', 'home')}
                  className="text-gray-800 dark:text-gray-200 cursor-pointer hover:text-black dark:hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </button>
                <div className={`h-1 bg-black rounded-full transition-transform duration-200 origin-left dark:bg-yellow-400 ${activeLine === "home" ? "scale-x-100" : "scale-x-0"}`} />
              </div>
              <div className="cursor-pointer">
                <button
                  onClick={() => scrollToSection('experience', 'experience')}
                  className="text-gray-800 dark:text-gray-200 cursor-pointer hover:text-black dark:hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Experience
                </button>
                <div className={`h-1 bg-black rounded-full transition-transform duration-200 origin-left dark:bg-yellow-400 ${activeLine === "experience" ? "scale-x-100" : "scale-x-0"}`} />
              </div>
              <div className="cursor-pointer">
                <button
                  onClick={() => scrollToSection('services', 'services')}
                  className="text-gray-800 dark:text-gray-200 cursor-pointer hover:text-black dark:hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Services
                </button>
                <div className={`h-1 bg-black rounded-full transition-transform duration-200 origin-left dark:bg-yellow-400 ${activeLine === "services" ? "scale-x-100" : "scale-x-0"}`} />
              </div>
              <div className="cursor-pointer">
                <button
                  onClick={() => scrollToSection('projects', 'projects')}
                  className="text-gray-800 dark:text-gray-200 cursor-pointer hover:text-black dark:hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Projects
                </button>
                <div className={`h-1 bg-black rounded-full transition-transform duration-200 origin-left dark:bg-yellow-400 ${activeLine === "projects" ? "scale-x-100" : "scale-x-0"}`} />
              </div>
              <div className="cursor-pointer">
                <button
                  onClick={() => scrollToSection('about', 'aboutme')}
                  className="text-gray-800 dark:text-gray-200 cursor-pointer hover:text-black dark:hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  About Me
                </button>
                <div className={`h-1 bg-black rounded-full transition-transform duration-200 origin-left dark:bg-yellow-400 ${activeLine === "aboutme" ? "scale-x-100" : "scale-x-0"}`} />
              </div>
              <a
                href="https://www.github.com/Rachit3784"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-yellow-400 px-2 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-colors"
              >
                <FaGithub className="inline-block mr-1" size={18} />
                GitHub
              </a>
              <button
                onClick={() => scrollToSection('contact', 'contact')}
                className="bg-black hover:bg-gray-800 cursor-pointer dark:bg-yellow-400 dark:hover:bg-yellow-300 text-white dark:text-black px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
              >
                Contact Me
              </button>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-yellow-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection('home', 'home')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('experience', 'experience')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('services', 'services')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('projects', 'projects')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('about', 'aboutme')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              About Me
            </button>
            <button
              onClick={() => scrollToSection('contact', 'contact')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Contact Me
            </button>
            <a
              href="https://www.github.com/Rachit3784"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;