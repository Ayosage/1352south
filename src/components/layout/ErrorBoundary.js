'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');
  
  useEffect(() => {
    const handleError = (event) => {
      console.error('Error caught by ErrorBoundary:', event);
      setHasError(true);
      setErrorDetails(event.message || 'Unknown error');
      event.preventDefault(); // Prevent default handling
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);
  
  if (hasError) {
    return (
      <div className="min-h-screen bg-black text-white pt-24">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-4xl font-light mb-6 tracking-wider">
            An <span className="text-amber-400">Error</span> Occurred
          </h1>
          <div className="w-16 h-[1px] bg-amber-400 mb-8"></div>
          
          <div className="bg-neutral-900 p-8 border border-neutral-800 mb-8">
            <p className="text-gray-300 mb-6 font-light">
              We apologize for the inconvenience. There was an error loading this page.
              {errorDetails && (
                <span className="block mt-2 text-sm text-amber-400 font-mono">
                  Error details: {errorDetails}
                </span>
              )}
            </p>
            
            <div className="flex space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="bg-transparent border border-amber-400 text-amber-400 py-2 px-6 rounded-none hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
              >
                Refresh Page
              </button>
              <Link
                href="/"
                className="bg-transparent border border-amber-400 text-amber-400 py-2 px-6 rounded-none hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return children;
}
