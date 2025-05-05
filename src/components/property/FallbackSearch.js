'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FallbackSearch() {
  const [showFallback, setShowFallback] = useState(false);
  
  useEffect(() => {
    // Check if Buying Buddy elements are populated after a timeout
    const timer = setTimeout(() => {
      const searchDetails = document.getElementById('MBBv3_SearchDetails');
      if (searchDetails && searchDetails.children.length <= 1) {
        console.log('Buying Buddy search not populated, showing fallback');
        setShowFallback(true);
      }
    }, 5000); // Wait 5 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!showFallback) return null;
  
  return (
    <div className="bg-neutral-900 p-8 mt-6 border border-neutral-800">
      <h3 className="text-xl font-light text-amber-400 mb-4">Unable to load property search</h3>
      <p className="text-gray-300 mb-6 font-light">
        We&apos;re experiencing some technical difficulties loading our property search functionality.
        Please try refreshing the page or browse our featured properties instead.
      </p>
      <div className="flex space-x-4">
        <button 
          onClick={() => window.location.reload()}
          className="bg-transparent border border-amber-400 text-amber-400 py-2 px-6 rounded-none hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
        >
          Refresh Page
        </button>
        <Link 
          href="/#properties"
          className="bg-transparent border border-amber-400 text-amber-400 py-2 px-6 rounded-none hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
        >
          View Featured Properties
        </Link>
      </div>
    </div>
  );
}
