"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ArrowRight, Briefcase, Globe, Smartphone } from 'lucide-react';
import FloatingActionButton from './FloatingActionButton';

/* Rotating dynamic tagline words (Conative-style) */
const TAGLINES = ['Next.js 16', 'React Native', 'TypeScript', 'MongoDB', 'Full-Stack'];

/* Stats for the counter bar */
const STATS = [
  { value: '5+',  label: 'Live Projects',     icon: Globe },
  { value: '2',   label: 'Companies Worked',  icon: Briefcase },
  { value: '2+',  label: 'Years Coding',      icon: null },
  { value: '100%',label: 'On Vercel',         icon: null },
];

const HeroSection = () => {
  const typedRef  = useRef(null);
  const typedInst = useRef(null);
  const [loaded,  setLoaded]  = useState(false);
  const [tagIdx,  setTagIdx]  = useState(0);
  const [visible, setVisible] = useState(true);

  /* Typed.js */
  useEffect(() => {
    if (document.querySelector('script[src*="typed.js"]')) { setLoaded(true); return; }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/typed.js@2.0.12';
    s.async = true;
    s.onload = () => setLoaded(true);
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    if (loaded && typedRef.current && window.Typed) {
      typedInst.current = new window.Typed(typedRef.current, {
        strings: ['Next.js Developer', 'React Native Developer', 'Full-Stack Engineer', 'Web Developer', 'App Developer'],
        typeSpeed: 35, backSpeed: 25, backDelay: 1500, loop: true,
      });
      return () => typedInst.current?.destroy();
    }
  }, [loaded]);

  /* Rotating tagline animation */
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setTagIdx(i => (i + 1) % TAGLINES.length);
        setVisible(true);
      }, 400);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-white dark:bg-[#0d0f1a] overflow-hidden"
      style={{ paddingTop: '105px' }}
    >
      {/* Watermark Background Text */}
      <span className="watermark-text select-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
        RACHIT
      </span>

      {/* Soft orange gradient blob */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-orange-100/60 dark:bg-orange-900/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-50/80 dark:bg-blue-900/10 rounded-full blur-[80px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text Content ────────────────────────────── */}
          <div className="order-2 lg:order-1">
            {/* Availability Badge */}
            <div className="saas-section-badge mb-5 w-fit">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Available For Hire · 2026 Batch
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-3 tracking-tight">
              Hi, I'm{' '}
              <span className="gradient-orange">Rachit Gupta</span>
            </h1>

            {/* Rotating tagline — Conative style */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl sm:text-2xl font-bold text-gray-500 dark:text-gray-400">Expert in</span>
              <span
                className={`text-xl sm:text-2xl font-black text-orange-500 transition-all duration-400 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
                style={{ minWidth: '200px', display: 'inline-block', transition: 'opacity 0.35s ease, transform 0.35s ease' }}
              >
                {TAGLINES[tagIdx]}
              </span>
            </div>

            {/* Typed.js subtitle */}
            <div className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-300 mb-5">
              Specializing as{' '}
              <span ref={typedRef} className="text-orange-500 font-bold">
                {!loaded && 'Next.js Developer'}
              </span>
            </div>

            <p className="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
              Full-Stack Engineer (2026 Batch) with hands-on internship experience building and deploying 
              live web & mobile apps using{' '}
              <strong className="text-gray-900 dark:text-white">Next.js 16 App Router</strong>,{' '}
              <strong className="text-orange-500">React Native</strong>, and{' '}
              <strong className="text-gray-900 dark:text-white">MongoDB Atlas</strong>. 
              Ready to ship scalable features from day one.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="saas-btn-primary text-sm cursor-pointer">
                Hire Me Now <ArrowRight size={16} />
              </button>
              <button
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="saas-btn-outline text-sm cursor-pointer">
                View Portfolio
              </button>
            </div>

            {/* Stat Counter Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center hover:border-orange-400 transition-colors">
                  <div className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Profile Card ───────────────────────────── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Floating ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-orange-300/60 dark:border-orange-500/30 animate-spin-slow scale-110" />

              {/* Profile image */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-900 shadow-2xl animate-float">
                <img
                  src="/Profile.jpg"
                  alt="Rachit Gupta"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Floating tech badges */}
              <div className="absolute -top-4 -left-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 px-3 py-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center">
                  <Globe size={13} className="text-white" />
                </div>
                <span className="text-xs font-bold text-gray-900 dark:text-white">Next.js 16</span>
              </div>

              <div className="absolute -bottom-4 -right-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 px-3 py-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
                  <Smartphone size={13} className="text-white" />
                </div>
                <span className="text-xs font-bold text-gray-900 dark:text-white">React Native</span>
              </div>

              <div className="absolute top-1/2 -right-10 -translate-y-1/2 bg-orange-500 rounded-xl shadow-lg px-3 py-2">
                <span className="text-xs font-bold text-white">MongoDB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
          className="animate-bounce p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full shadow-md hover:border-orange-400 transition-colors cursor-pointer">
          <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      <FloatingActionButton />
    </section>
  );
};

export default HeroSection;