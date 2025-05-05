'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-light mb-6 tracking-wider">
          Something went <span className="text-amber-400">wrong</span>
        </h1>
        <div className="w-16 h-[1px] bg-amber-400 mb-8"></div>
        
        <div className="bg-neutral-900 p-8 border border-neutral-800 mb-8">
          <p className="text-gray-300 mb-6 font-light">
            We apologize for the inconvenience. An error occurred while loading this page.
          </p>
          
          <div className="flex space-x-4">
            <button
              onClick={() => reset()}
              className="bg-transparent border border-amber-400 text-amber-400 py-2 px-6 rounded-none hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="bg-transparent border border-amber-400 text-amber-400 py-2 px-6 rounded-none hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
