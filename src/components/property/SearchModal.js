'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchModal({ isOpen, onClose }) {
  useEffect(() => {
    // When modal opens, refresh MBB to ensure search loads properly
    if (isOpen && window.MBB && typeof window.MBB.refresh === 'function') {
      try {
        console.log('Refreshing MBB in search modal');
        window.MBB.refresh();
      } catch (err) {
        console.error('Error refreshing MBB in modal:', err);
      }
    }
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div 
              className="bg-black border border-neutral-800 rounded w-full max-w-6xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
            >
              {/* Modal header */}
              <div className="flex justify-between items-center p-6 border-b border-neutral-800">
                <h2 className="text-2xl font-light text-white">
                  Property <span className="text-amber-400">Search</span>
                </h2>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                  aria-label="Close search modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Modal body - MBB Search container */}
              <div className="p-6">
                <div 
                  id="MBBv3_SearchDetails"
                  className="w-full min-h-[600px]"
                >
                  {/* Content will be injected by Buying Buddy */}
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
