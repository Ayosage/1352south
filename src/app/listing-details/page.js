'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ListingDetails() {
  const [isLoaded, setIsLoaded] = useState(false);
  const searchParams = useSearchParams();
  const listingId = searchParams.get('id');
  
  useEffect(() => {
    setIsLoaded(true);
    
    if (window.MBB && typeof window.MBB.refresh === 'function') {
      try {
        console.log('Calling MBB.refresh from listing-details page');
        window.MBB.refresh();
        
        if (listingId && window.MBB.setCurrentProperty) {
          console.log('Setting current property ID:', listingId);
          window.MBB.setCurrentProperty(listingId);
        }
      } catch (err) {
        console.error('Error refreshing MBB:', err);
      }
    } else {
      console.warn('MBB object not available or refresh method not found');
    }
  }, [listingId]);

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
              Property <span className="text-amber-400">Details</span>
            </h1>
            <div className="w-16 h-[1px] bg-amber-400 mb-8"></div>
            
            <p className="text-gray-300 mb-12 font-light max-w-3xl">
              {listingId 
                ? "View all the details about this property and reach out if you're interested."
                : "Find your perfect home with our advanced property search. Filter by price, bedrooms, location, and more."}
            </p>
            
            <div className="mb-12">
              <Link 
                href="/" 
                className="inline-block bg-transparent border border-amber-400 text-amber-400 py-2 px-6 rounded-none hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
              >
                Back to Home
              </Link>
            </div>

            <div 
              id="MBBv3_SearchDetails"
              className="w-full min-h-[600px]"
              property-id={listingId || ''}
            >
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ListingDetailsFallback() {
  return (
    <div className="bg-black text-white min-h-screen pt-24">
      <div className="container mx-auto px-6">
        <div className="py-12">
          <h1 className="text-4xl font-light mb-6 tracking-wider">
            Loading <span className="text-amber-400">Property Details</span>
          </h1>
          <div className="w-16 h-[1px] bg-amber-400 mb-8"></div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component wrapped with Suspense
export default function ListingDetailsPage() {
  return (
    <Suspense fallback={<ListingDetailsFallback />}>
      <ListingDetails />
    </Suspense>
  );
}
