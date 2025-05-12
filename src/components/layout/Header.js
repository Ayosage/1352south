'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

 

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-2xl font-light tracking-widest">
            <span>1352</span> <span className="text-amber-400">SOUTH</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/#listings" className="text-gray-300 hover:text-amber-400 transition-colors font-light tracking-wide">
              Properties
            </Link>
          </nav>
          
          <div className="hidden md:block">
            <Link 
              href="/#contact" 
              className="bg-transparent border border-amber-400 text-amber-400 py-2 px-4 rounded-none hover:bg-amber-400 hover:text-black transition-colors text-sm tracking-wider uppercase font-light"
            >
              Contact
            </Link>
          </div>
          
          <button 
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black pt-24 z-40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container mx-auto px-6">
              <ul className="flex flex-col space-y-6">
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link 
                    href="/#listings" 
                    className="text-gray-300 hover:text-amber-400 text-2xl font-light tracking-wide block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Properties
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link 
                    href="/#amenities" 
                    className="text-gray-300 hover:text-amber-400 text-2xl font-light tracking-wide block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Amenities
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link 
                    href="/#contact" 
                    className="text-gray-300 hover:text-amber-400 text-2xl font-light tracking-wide block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link 
                    href="/#contact" 
                    className="inline-block mt-4 bg-transparent border border-amber-400 text-amber-400 py-3 px-8 rounded-none hover:bg-amber-400 hover:text-black transition-colors text-lg tracking-wider uppercase font-light"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Schedule Tour
                  </Link>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}