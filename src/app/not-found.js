'use client';
// src/app/not-found.js — Next.js 404 Component
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="text-8xl font-display font-extrabold text-orange-500 mb-4 tracking-tighter">
        404
      </div>
      <h1 className="text-2xl font-bold font-display mb-3">Page Not Found</h1>
      <p className="text-gray-400 text-sm max-w-md mb-8 leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">
        <Home size={16} /> Return to Homepage
      </Link>
    </div>
  );
}
