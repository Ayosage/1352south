'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { properties } from '@/lib/propertyData';
import PropertyMap from '@/components/property/PropertyMap';

export default function PropertyDetail({ params }) {
  const { id } = params;
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // In a real application, you would fetch data from an API
    // For this demo, we'll use our mock data
    try {
      const propertyData = properties.find(p => p.id === Number(id));
      
      if (propertyData) {
        setProperty(propertyData);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error fetching property:', err);
      setError(true);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setIsLoaded(true);
      }, 100);
    }
  }, [id]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };
  
  const slideUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-16 bg-black min-h-screen flex items-center justify-center">
        <div className="bg-neutral-900 border border-neutral-800 text-white p-8 max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-light mb-4 tracking-wide">Property Not Found</h2>
          <p className="mb-6 text-gray-400 font-light">We couldn&apos;t find the property you&apos;re looking for. It may have been removed or the ID is incorrect.</p>
          <Link href="/#properties" className="inline-block bg-transparent border border-amber-400 text-amber-400 py-2 px-6 hover:bg-amber-400 hover:text-black transition-colors font-light tracking-wide">
            View All Residences
          </Link>
        </div>
      </div>
    );
  }

  const { address, price, bedrooms, bathrooms, squareFeet, description, features, image, propertyType } = property;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <motion.div 
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="mb-6"
        >
          <Link href="/#properties" className="text-amber-400 hover:underline inline-flex items-center font-light">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Residences
          </Link>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeIn} className="lg:col-span-2">
            <div className="relative h-[500px] w-full overflow-hidden">
              <Image 
                src={image} 
                alt={`${address.street} property`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-3xl font-light text-white mb-2 tracking-wide">{address.street}</h1>
                <p className="text-xl text-gray-300 font-light">
                  {address.city}, {address.state} {address.zipCode}
                </p>
              </div>
            </div>

            <motion.div variants={slideUp} className="mt-8">
              <div className="flex flex-wrap gap-8 mb-8">
                <div className="flex flex-col items-center text-center">
                  <div className="text-amber-400 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <span className="text-lg font-light">{bedrooms}</span>
                  <span className="text-sm text-gray-400 font-light">{bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="text-amber-400 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-lg font-light">{bathrooms}</span>
                  <span className="text-sm text-gray-400 font-light">{bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="text-amber-400 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                  </div>
                  <span className="text-lg font-light">{squareFeet.toLocaleString()}</span>
                  <span className="text-sm text-gray-400 font-light">Square Feet</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="text-amber-400 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-lg font-light capitalize">{propertyType}</span>
                  <span className="text-sm text-gray-400 font-light">Property Type</span>
                </div>
              </div>

              <div className="border-t border-neutral-800 my-8"></div>

              <h2 className="text-2xl font-light text-white mb-4 tracking-wide">About This Residence</h2>
              <p className="text-gray-300 mb-8 leading-relaxed font-light">
                {description}
              </p>
              
              <h3 className="text-xl font-light text-white mt-10 mb-4 tracking-wide">Features & Amenities</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300 font-light">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
          
          <motion.div variants={slideUp}>
            <div className="bg-neutral-900 border border-neutral-800 p-6 sticky top-24">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-light text-amber-400">${price.toLocaleString()}</h2>
                <p className="text-sm text-gray-400 mt-1 font-light">Est. ${Math.round(price / 240).toLocaleString()}/mo</p>
              </div>
              
              <div className="space-y-4">
                <button className="w-full bg-amber-400 text-black py-3 px-4 hover:bg-amber-300 transition-colors font-light tracking-wider uppercase">
                  Schedule a Tour
                </button>
                
                <button className="w-full bg-transparent border border-amber-400 text-amber-400 py-3 px-4 hover:bg-amber-400 hover:text-black transition-colors font-light tracking-wider uppercase">
                  Contact Agent
                </button>
              </div>
              
              <div className="mt-8 border-t border-neutral-800 pt-6">
                <h3 className="text-lg font-light mb-4 tracking-wide">Interested in this residence?</h3>
                <form className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full bg-black border-0 border-b border-neutral-800 py-2 px-3 text-white focus:ring-0 focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full bg-black border-0 border-b border-neutral-800 py-2 px-3 text-white focus:ring-0 focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Your Phone" 
                      className="w-full bg-black border-0 border-b border-neutral-800 py-2 px-3 text-white focus:ring-0 focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="I'm interested in this property..." 
                      rows="3" 
                      className="w-full bg-black border-0 border-b border-neutral-800 py-2 px-3 text-white focus:ring-0 focus:border-amber-400 transition-colors"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-amber-400 text-black py-2 px-4 hover:bg-amber-300 transition-colors font-light tracking-wider uppercase">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-16"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-light text-white mb-6 tracking-wide">Location</h2>
          <div className="h-[400px] bg-neutral-900 rounded-none border border-neutral-800">
            {property && (
              <PropertyMap property={property} />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}