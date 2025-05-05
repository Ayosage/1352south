'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function BuyingBuddyScript() {
  const pathname = usePathname();
  
  useEffect(() => {
    // Only load on relevant pages
    if (!pathname.includes('/property') && 
        pathname !== '/' && 
        pathname !== '/listing-results' && 
        pathname !== '/search') {
      return;
    }
    
    console.log('Loading Buying Buddy scripts on path:', pathname);
    
    // Simple, direct script loading approach
    const loadScripts = async () => {
      try {
        // 1. Load the CSS
        const linkEl = document.createElement('link');
        linkEl.rel = 'stylesheet';
        linkEl.href = 'https://www.mbb2.com/version3/css/theme/acid/KNdD0yub';
        document.head.appendChild(linkEl);
        
        // 2. Add the MBB initialization
        window.MBB = {seo: "false", data: {acid: "KNdD0yub"}};
        window.mbbMapLoaded = function() {
          if (window.MBB) window.MBB.googleMaps = true;
        };
        
        // 3. Load Google Maps script
        const loadGoogleMaps = new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://maps.googleapis.com/maps/api/js?callback=mbbMapLoaded&libraries=places';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
        
        // 4. Load the main Buying Buddy script
        const loadMainScript = new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://d2w6u17ngtanmy.cloudfront.net/scripts/my-buying-buddy.5.0.js.gz';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
        
        // Load scripts in parallel
        await Promise.all([loadGoogleMaps, loadMainScript]);
        
        // Refresh MBB after a short delay
        setTimeout(() => {
          if (window.MBB && typeof window.MBB.refresh === 'function') {
            window.MBB.refresh();
            console.log('MBB refresh called successfully');
          }
        }, 1000);
        
      } catch (err) {
        console.error('Error loading Buying Buddy scripts:', err);
      }
    };
    
    // Only load if MBB isn't already defined
    if (!window.MBB) {
      loadScripts();
    }
    
    // Cleanup
    return () => {
      // Nothing to clean up
    };
  }, [pathname]);
  
  // Return null as we're injecting scripts manually
  return null;
}
