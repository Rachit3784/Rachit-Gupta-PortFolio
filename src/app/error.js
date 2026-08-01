'use client';
// src/app/error.js — Next.js Error Boundary Component
import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
        <AlertCircle size={32} className="text-orange-500" />
      </div>
      <h1 className="text-3xl font-bold font-display mb-3">Something went wrong</h1>
      <p className="text-gray-400 text-sm max-w-md mb-8 leading-relaxed">
        {error?.message || 'An unexpected error occurred. Please try refreshing the page or returning home.'}
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="btn-primary cursor-pointer"
        >
          <RefreshCw size={16} /> Try Again
        </button>
        <Link href="/" className="btn-ghost">
          <Home size={16} /> Go Home
        </Link>
      </div>
    </div>
  );
}
