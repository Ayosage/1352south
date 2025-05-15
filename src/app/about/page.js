'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  
  const galleryImages = [
    '/images/DSC02435.jpg',
    '/images/DSC02455.jpg',
    '/images/DSC02483.jpg',
    '/images/DSC02509.jpg',
    '/images/1352 South St Unit 308-Full-20.jpg',
    '/images/1352 South St Unit 308-Full-22.jpg',
    '/images/1352 South St Unit 308-Full-18.jpg',
    '/images/1352 South St Unit 308-Full-21.jpg',
    '/images/1352 South St Unit 308-Full-23.jpg',
    '/images/1352 South St Unit 308-Full-24.jpg',
    '/images/1352 South St Unit 308-Full-25.jpg',
    '/images/DSC02442.jpg',
    '/images/DSC02448.JPG',
    '/images/DSC02462.JPG',
    '/images/DSC02469.JPG',
    '/images/DSC02476.JPG',
    '/images/DSC02490.JPG',
    '/images/DSC02502.JPG',
    '/images/DSC02516.JPG',
  ];
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const openLightbox = (image) => {
    setLightboxImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };
  
  const slideUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } }
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
  
  return (
    <>
      <section className="relative h-96 flex items-center justify-center bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/DSC02509.jpg"
            alt="1352 Lofts Interior"
            fill
            priority
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/90"></div>
        </div>
        
        <motion.div 
          className="container mx-auto px-6 z-10 text-center"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-thin text-white mb-6 tracking-wider"
            variants={slideUp}
          >
            About <span className="text-amber-400 font-light">1352 LOFTS</span>
          </motion.h1>
          <motion.div 
            className="w-24 h-[1px] bg-amber-400 mx-auto mb-10"
            variants={slideUp}
          ></motion.div>
        </motion.div>
      </section>
      
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center mb-12">
            <button 
              className={`px-6 py-3 mx-2 mb-3 border-b-2 ${activeTab === 'about' ? 'border-amber-400 text-amber-400' : 'border-transparent text-gray-400'} transition-all`}
              onClick={() => setActiveTab('about')}
            >
              Our Story
            </button>
            <button 
              className={`px-6 py-3 mx-2 mb-3 border-b-2 ${activeTab === 'gallery' ? 'border-amber-400 text-amber-400' : 'border-transparent text-gray-400'} transition-all`}
              onClick={() => setActiveTab('gallery')}
            >
              Photo Gallery
            </button>
            <button 
              className={`px-6 py-3 mx-2 mb-3 border-b-2 ${activeTab === 'amenities' ? 'border-amber-400 text-amber-400' : 'border-transparent text-gray-400'} transition-all`}
              onClick={() => setActiveTab('amenities')}
            >
              Amenities
            </button>
          </div>
          
          {activeTab === 'about' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div className="relative h-[500px] w-full">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src="/images/DSC02483.jpg"
                    alt="1352 Lofts Exterior"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 border border-amber-400 -translate-x-4 -translate-y-4 z-[-1]"></div>
              </div>
              
              <div>
                <h2 className="text-3xl font-light mb-6 tracking-wider">
                  Our <span className="text-amber-400">Vision</span>
                </h2>
                <div className="w-16 h-[1px] bg-amber-400 mb-8"></div>
                <p className="text-gray-300 mb-6 leading-relaxed font-light">
                  At 1352 Lofts, we believe that luxury is not just about opulence, but about creating spaces that inspire and elevate everyday living. Our vision was to transform a historic Philadelphia structure into a modern haven that respects its architectural heritage while embracing contemporary design.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed font-light">
                  Founded on the principles of exceptional craftsmanship, thoughtful design, and community focus, 1352 Lofts represents the pinnacle of urban residential living. Each residence has been meticulously designed to maximize space, light, and comfort, creating homes that are as functional as they are beautiful.
                </p>
                <p className="text-gray-300 mb-8 leading-relaxed font-light">
                  Our commitment to quality extends beyond our physical spaces to the community we&apos;ve cultivated. 1352 Lofts is more than a residence — it&apos;s a lifestyle that balances privacy with connection, luxury with practicality, and personal space with shared experiences.
                </p>
                
                <Link 
                  href="/#contact" 
                  className="inline-block bg-transparent border border-amber-400 text-amber-400 py-3 px-8 rounded-none hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'gallery' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-7xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image, index) => (
                  <motion.div 
                    key={index}
                    className="relative h-[300px] overflow-hidden cursor-pointer group"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => openLightbox(image)}
                  >
                    <Image
                      src={image}
                      alt={`1352 Lofts - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === 'amenities' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-7xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-neutral-900 p-8 border border-neutral-800">
                  <h3 className="text-2xl font-light mb-6">Building <span className="text-amber-400">Features</span></h3>
                  <div className="w-12 h-[1px] bg-amber-400 mb-8"></div>
                  <ul className="space-y-4 text-gray-300 font-light">
                    <li className="flex items-center">
                      <svg className="text-amber-400 w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      24-hour concierge service
                    </li>
                    <li className="flex items-center">
                      <svg className="text-amber-400 w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      State-of-the-art fitness center
                    </li>
                    <li className="flex items-center">
                      <svg className="text-amber-400 w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      Rooftop terrace with panoramic views
                    </li>
                    <li className="flex items-center">
                      <svg className="text-amber-400 w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      Resident lounge with co-working spaces
                    </li>
                    <li className="flex items-center">
                      <svg className="text-amber-400 w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      Pet Friendly Building
                    </li>
                    <li className="flex items-center">
                      <svg className="text-amber-400 w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      Private parking garage
                    </li>
                    <li className="flex items-center">
                      <svg className="text-amber-400 w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      Bicycle storage
                    </li>
                  </ul>
                </div>
                
                <div className="bg-neutral-900 p-8 border border-neutral-800">
                  <h3 className="text-2xl font-light mb-6">Residence <span className="text-amber-400">Features</span></h3>
                  <div className="w-12 h-[1px] bg-amber-400 mb-8"></div>
                  <ul className="space-y-4 text-gray-300 font-light">
                    <li className="flex items-center">
                      <svg className="text-amber-400 w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      Floor-to-ceiling windows
                    </li>
                    <li className="flex items-center">
                      <svg className="text-amber-400 w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      Designer kitchens with premium appliances
                    </li>
                    <li className="flex items-center">
                      <svg className="text-amber-400 w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      Spacious open floor plans
                    </li>
                    <li className="flex items-center">
                      <svg className="text-amber-400 w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      Luxury bathroom fixtures
                    </li>
                    <li className="flex items-center">
                      <svg className="text-amber-400 w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      In-unit washer and dryer
                    </li>
                    <li className="flex items-center">
                      <svg className="text-amber-400 w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      Smart home technology
                    </li>
                    <li className="flex items-center">
                      <svg className="text-amber-400 w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      Private balconies or terraces in select units
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
      
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full max-w-6xl h-[80vh]">
            <Image
              src={lightboxImage}
              alt="1352 Lofts - Gallery image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
