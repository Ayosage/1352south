'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MBBWidgetLoader from '@/components/property/MBBWidgetLoader';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const galleryImages = [
    '/images/renders/Untitled-1-01.jpg',
    '/images/renders/Untitled-1-02.jpg',
    '/images/renders/Untitled-1-03.jpg',
    '/images/renders/Untitled-1-04.jpg',
    '/images/renders/Untitled-1-05.jpg',
    '/images/renders/Untitled-1-06.jpg',
    '/images/renders/Untitled-1-07.jpg',
    '/images/renders/Untitled-1-08.jpg',
    '/images/renders/Untitled-1-09.jpg',
    '/images/renders/Untitled-1-10.jpg'
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 
    
    return () => clearInterval(interval);
  }, [galleryImages.length]);
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Initialize or refresh MBB when returning to the home page
    if (typeof window !== 'undefined' && typeof window.initOrRefreshMBB === 'function') {
      console.log('Calling global initOrRefreshMBB from home page');
      // Delay to ensure scripts are ready
      const timeoutId = setTimeout(() => {
        window.initOrRefreshMBB();
      }, 800);
      
      return () => clearTimeout(timeoutId);
    }
  }, []);

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
      <section className="relative h-screen flex items-center justify-center bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Luxury condo exterior"
            fill
            priority
            className="object-cover opacity-70 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/90"></div>
        </div>
        
        <motion.div 
          className="container mx-auto px-6 z-10 text-center"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-thin text-white mb-6 tracking-wider"
            variants={slideUp}
          >
            <span className="font-light">1352</span> <span className="text-amber-400 font-light">LOFTS</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-extralight tracking-wide"
            variants={slideUp}
          >
            Discover unparalleled luxury living in the heart of the city
          </motion.p>
          <motion.div variants={slideUp}>
            <Link 
              href="#properties" 
              className="inline-block bg-transparent border border-amber-400 text-amber-400 py-3 px-10 rounded-none hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
            >
              Explore Residences
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </section>
      
      <section id="about" className="py-24 bg-black text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.div variants={fadeIn}>
              <div className="relative h-[500px] w-full">
                <div className="relative h-full w-full overflow-hidden">
                  {galleryImages.map((src, index) => (
                    <div 
                      key={index} 
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`Luxury property image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-amber-400' : 'bg-white/50'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 border border-amber-400 -translate-x-4 -translate-y-4 z-[-1]"></div>
              </div>
            </motion.div>
            
            <motion.div variants={slideUp}>
              <h2 className="text-3xl font-light mb-6 tracking-wider">
                A New Standard of <span className="text-amber-400">Luxury</span>
              </h2>
              <div className="w-16 h-[1px] bg-amber-400 mb-8"></div>
              <p className="text-gray-300 mb-8 leading-relaxed font-light">
                At 1352 Lofts, we&apos;ve redefined luxury living. Our meticulously crafted residences 
                blend modern aesthetics with timeless elegance, creating spaces that are as 
                functional as they are beautiful. Each detail has been considered, each finish 
                carefully selected to create homes of distinction.
              </p>
              <p className="text-gray-300 mb-10 leading-relaxed font-light">
                Located in the heart of the city&apos;s most vibrant district, 1352 Lofts offers 
                unmatched access to culture, cuisine, and convenience. Our residents enjoy 
                exclusive amenities designed to enhance well-being and foster community.
              </p>
              <Link 
                href="/about" 
                className="inline-block bg-transparent border border-amber-400 text-amber-400 py-3 px-8 rounded-none hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
              >
                Discover More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <section id="amenities" className="py-24 bg-neutral-950 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 
              className="text-3xl font-light mb-6 tracking-wider"
              variants={fadeIn}
            >
              Premium <span className="text-amber-400">Amenities</span>
            </motion.h2>
            <motion.div className="w-16 h-[1px] bg-amber-400 mx-auto mb-8" variants={fadeIn}></motion.div>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto font-light mb-12"
              variants={fadeIn}
            >
              1352 Lofts offers an array of thoughtfully designed amenities to enhance your living experience
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <motion.div variants={fadeIn} className="bg-neutral-900 p-8 border border-neutral-800">
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
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-neutral-900 p-8 border border-neutral-800">
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
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <section id="properties" className="py-24 bg-neutral-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 
              className="text-3xl font-light mb-6 tracking-wider"
              variants={fadeIn}
            >
              Available <span className="text-amber-400">Residences</span>
            </motion.h2>
            <motion.div className="w-16 h-[1px] bg-amber-400 mx-auto mb-8" variants={fadeIn}></motion.div>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto font-light"
              variants={fadeIn}
            >
              Discover our collection of premium residences, each offering a unique expression of luxury living
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <div id="listings" className="mb-12"></div>
            <div 
              id="MBBv3_FeaturedList"
              filter="mls_id:demo+listing_status:active+zip_code:19147+address_num_min:1352+address_num_max:1352+street_name:South St+login-panel:false+header-menu:false+limit:12+order:create_dt desc,price"
              className="w-full min-h-[600px] mb-12"
              property-click="MBB.propertyClickHandler"
            >
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
              </div>
            </div>
            <MBBWidgetLoader />
          </motion.div>
        </div>
      </section>
       
      
      <section id="contact" className="py-24 bg-neutral-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={slideUp}>
              <h2 className="text-3xl font-light mb-6 tracking-wider">
                Schedule a <span className="text-amber-400">Private Viewing</span>
              </h2>
              <div className="w-16 h-[1px] bg-amber-400 mb-8"></div>
              <p className="text-gray-300 mb-10 font-light">
                Experience 1352 Lofts in person. Contact our sales team to arrange a private tour of our available residences and amenities.
              </p>
              
              <address className="not-italic text-gray-300 font-light mb-10">
                <div className="flex items-start mb-4">
                  <div className="text-amber-400 mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-normal text-white mb-1">Location</p>
                    <p>1352 South Street</p>
                    <p>Philadelphia, PA 19147</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-4">
                  <div className="text-amber-400 mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-normal text-white mb-1">Phone</p>
                    <p>(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-amber-400 mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-normal text-white mb-1">Email</p>
                    <p>info@1352lofts.com</p>
                  </div>
                </div>
              </address>
              
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <form className="bg-black p-8 border border-neutral-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-light text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-neutral-900 border-0 border-b border-neutral-800 py-2 px-3 text-white focus:ring-0 focus:border-amber-400 transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-light text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-neutral-900 border-0 border-b border-neutral-800 py-2 px-3 text-white focus:ring-0 focus:border-amber-400 transition-colors"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-light text-gray-400 mb-2">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full bg-neutral-900 border-0 border-b border-neutral-800 py-2 px-3 text-white focus:ring-0 focus:border-amber-400 transition-colors"
                      placeholder="Your Phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-sm font-light text-gray-400 mb-2">Interested In</label>
                    <select
                      id="interest"
                      className="w-full bg-neutral-900 border-0 border-b border-neutral-800 py-2 px-3 text-white focus:ring-0 focus:border-amber-400 transition-colors"
                    >
                      <option value="" className="bg-neutral-900">Select Option</option>
                      <option value="one-bedroom" className="bg-neutral-900">One Bedroom</option>
                      <option value="two-bedroom" className="bg-neutral-900">Two Bedroom</option>
                      <option value="penthouse" className="bg-neutral-900">Penthouse</option>
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-light text-gray-400 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full bg-neutral-900 border-0 border-b border-neutral-800 py-2 px-3 text-white focus:ring-0 focus:border-amber-400 transition-colors"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-400 text-black py-3 px-4 hover:bg-amber-300 transition-colors font-light tracking-widest uppercase"
                >
                  Submit Inquiry
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
