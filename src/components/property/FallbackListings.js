'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FallbackListings() {
  const [showFallback, setShowFallback] = useState(false);
  
  useEffect(() => {
    // Check if Buying Buddy elements are populated after a timeout
    const timer = setTimeout(() => {
      const listingResults = document.getElementById('MBBv3_FeaturedList');
      if (listingResults && listingResults.children.length <= 1) {
        console.log('Buying Buddy listings not populated, showing fallback');
        setShowFallback(true);
      }
    }, 5000); // Wait 5 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!showFallback) return null;
  
  return (
    <div className="bg-neutral-900 p-8 mt-6 border border-neutral-800">
      <h3 className="text-xl font-light text-amber-400 mb-4">Unable to load property listings</h3>
      <p className="text-gray-300 mb-6 font-light">
        We&apos;re experiencing some technical difficulties loading our property listings.
        Please try refreshing the page or contact us directly for assistance.
      </p>
      <div className="flex space-x-4">
        <button 
          onClick={() => window.location.reload()}
          className="bg-transparent border border-amber-400 text-amber-400 py-2 px-6 rounded-none hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
        >
          Refresh Page
        </button>
        <Link 
          href="/#contact"
          className="bg-transparent border border-amber-400 text-amber-400 py-2 px-6 rounded-none hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
