'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PropertyCard({ property }) {
  const { id, address, price, bedrooms, bathrooms, squareFeet, image } = property;

  return (
    <motion.div 
      className="bg-black border border-neutral-800 overflow-hidden group"
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 },
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
    >
      <div className="relative h-60 overflow-hidden">
        <Image
          src={image}
          alt={`${address.street} property`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="bg-amber-400 text-black px-3 py-1 text-sm font-medium">
            ${price.toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-light text-white mb-2 tracking-wide">{address.street}</h3>
        <p className="text-gray-400 text-sm mb-4 font-light">
          {address.city}, {address.state} {address.zipCode}
        </p>
        
        <div className="flex flex-wrap gap-4 text-xs mb-6">
          <div className="flex items-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          
          <div className="flex items-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          
          <div className="flex items-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
            <span>{squareFeet.toLocaleString()} sq ft</span>
          </div>
        </div>
        
        <Link 
          href={`/property/${id}`}
          className="block text-center bg-transparent border border-amber-400 text-amber-400 py-2 px-4 transition-colors hover:bg-amber-400 hover:text-black text-sm tracking-wider uppercase font-light"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}