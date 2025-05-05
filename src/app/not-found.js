'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-light mb-6 tracking-wider">
          Page <span className="text-amber-400">Not Found</span>
        </h1>
        <div className="w-16 h-[1px] bg-amber-400 mb-8"></div>
        
        <div className="bg-neutral-900 p-8 border border-neutral-800 mb-8">
          <p className="text-gray-300 mb-6 font-light">
            We couldn&apos;t find the page you were looking for. It might have been moved or deleted.
          </p>
          
          <div className="flex space-x-4">
            <Link
              href="/"
              className="bg-transparent border border-amber-400 text-amber-400 py-2 px-6 rounded-none hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
            >
              Return Home
            </Link>
            <Link
              href="/listing-results"
              className="bg-transparent border border-amber-400 text-amber-400 py-2 px-6 rounded-none hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
            >
              View Listings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
