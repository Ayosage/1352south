'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FallbackListings from '@/components/property/FallbackListings';

export default function ListingsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded state after component mounts
    setIsLoaded(true);
    
    // MBB needs to refresh when the page loads
    if (window.MBB && typeof window.MBB.refresh === 'function') {
      try {
        console.log('Calling MBB.refresh from listing-results page');
        window.MBB.refresh();
      } catch (err) {
        console.error('Error refreshing MBB:', err);
      }
    } else {
      console.warn('MBB object not available or refresh method not found');
    }
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="py-12">
            <h1 className="text-4xl font-light mb-6 tracking-wider">
              Available <span className="text-amber-400">Residences</span>
            </h1>
            <div className="w-16 h-[1px] bg-amber-400 mb-8"></div>
            
            <p className="text-gray-300 mb-12 font-light max-w-3xl">
              Browse our collection of exclusive properties. Each residence represents the pinnacle of luxury living, 
              meticulously designed to provide unparalleled comfort and elegance.
            </p>
            
            <div className="mb-12">
              <Link 
                href="/" 
                className="inline-block bg-transparent border border-amber-400 text-amber-400 py-2 px-6 rounded-none hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
              >
                Back to Home
              </Link>
            </div>

            {/* Buying Buddy Listings Container */}
            <div 
              id="MBBv3_FeaturedList"
              filter="mls_id:demo+listing_status:active+login-panel:false+header-menu:false+limit:15+order:price"
              className="w-full min-h-[600px]"
            >
              {/* Content will be injected by Buying Buddy */}
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
              </div>
            </div>
            
            {/* Fallback in case Buying Buddy fails to load */}
            <FallbackListings />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
