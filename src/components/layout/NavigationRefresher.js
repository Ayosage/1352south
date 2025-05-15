'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationRefresher() {
  const pathname = usePathname();
  const previousPathRef = useRef(null);
  
  useEffect(() => {
    console.log('Navigation detected: from', previousPathRef.current, 'to', pathname);
    
    // Check if we're navigating back to the home page from somewhere else
    if (pathname === '/' && previousPathRef.current && previousPathRef.current !== '/') {
      console.log('Navigated back to home page from', previousPathRef.current, '- refreshing page');
      // Force a full page refresh
      window.location.reload();
    }
    
    // Update previous path for next navigation
    previousPathRef.current = pathname;
  }, [pathname]);
  
  return null; // This component doesn't render anything
}