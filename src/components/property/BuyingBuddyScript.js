'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function BuyingBuddyScript() {
  const pathname = usePathname();
  
  // Debug script loading
  useEffect(() => {
    console.log('BuyingBuddyScript loading on path:', pathname);
    
    // This creates a global error handler that might catch script loading issues
    const originalOnError = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
      console.error('Script error caught:', { message, source, lineno, colno });
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error);
      }
      return false;
    };
    
    // Manual script loading as a fallback in case Next.js Script component fails
    const loadScriptManually = () => {
      // Check if MBB is already defined
      if (window.MBB) {
        console.log('MBB already exists, skipping manual script loading');
        return;
      }
      
      try {
        console.log('Attempting to load Buying Buddy scripts manually');
        
        // Step 1: Load CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://www.mbb2.com/version3/css/theme/acid/KNdD0yub';
        document.head.appendChild(cssLink);
        
        // Step 2: Initialize MBB object
        window.MBB = {seo: "false", data: {acid: "KNdD0yub"}};
        window.mbbMapLoaded = function() {
          if (typeof window.MBB !== 'undefined') {
            window.MBB.googleMaps = true;
            console.log('Google Maps loaded for MBB (manual)');
          }
        };
        
        // Step 3: Load Google Maps
        const mapsScript = document.createElement('script');
        mapsScript.src = 'https://maps.googleapis.com/maps/api/js?callback=mbbMapLoaded&libraries=places';
        document.head.appendChild(mapsScript);
        
        // Step 4: Load main script
        const mainScript = document.createElement('script');
        mainScript.src = 'https://d2w6u17ngtanmy.cloudfront.net/scripts/my-buying-buddy.5.0.js.gz';
        mainScript.onload = function() {
          console.log('Buying Buddy main script loaded manually');
          if (window.MBB && typeof window.MBB.refresh === 'function') {
            setTimeout(() => {
              try {
                window.MBB.refresh();
                console.log('MBB refresh called after manual loading');
              } catch (err) {
                console.error('Error calling MBB.refresh after manual loading:', err);
              }
            }, 1000);
          }
        };
        document.head.appendChild(mainScript);
      } catch (err) {
        console.error('Error in manual script loading:', err);
      }
    };
    
    // Try manual loading after a delay if MBB isn't defined yet
    const timer = setTimeout(() => {
      if (!window.MBB) {
        loadScriptManually();
      }
    }, 5000);
    
    return () => {
      window.onerror = originalOnError;
      clearTimeout(timer);
    };
  }, [pathname]);
  
  // Load on home, property detail pages, listings, and search pages
  if (!pathname.includes('/property') && 
      pathname !== '/' && 
      pathname !== '/listing-results' && 
      pathname !== '/search') {
    return null;
  }

  return (
    <>
      {/* Buying Buddy plugin v5.02 for General HTML; Authorized Domain: 1352south.vercel.app */}
      <Script
        id="buying-buddy-css"
        src="https://www.mbb2.com/version3/css/theme/acid/KNdD0yub"
        strategy="afterInteractive"
        onError={(e) => {
          console.error('Error loading Buying Buddy CSS:', e);
        }}
      />
      <Script
        id="buying-buddy-init"
        strategy="afterInteractive"
        onError={(e) => {
          console.error('Error initializing Buying Buddy:', e);
        }}
        dangerouslySetInnerHTML={{
          __html: `
            try {
              var MBB = {seo : "false",data:{ acid : "KNdD0yub" } };
              function mbbMapLoaded(){ 
                if (typeof MBB !== 'undefined') {
                  MBB.googleMaps = true;
                  console.log('Google Maps loaded for MBB');
                }
              };
            } catch (err) {
              console.error('Error in MBB init script:', err);
            }
          `
        }}
      />
      <Script
        id="google-maps"
        src="https://maps.googleapis.com/maps/api/js?callback=mbbMapLoaded&libraries=places"
        strategy="afterInteractive"
        onError={(e) => {
          console.error('Error loading Google Maps:', e);
        }}
      />
      <Script
        id="buying-buddy-main"
        src="https://d2w6u17ngtanmy.cloudfront.net/scripts/my-buying-buddy.5.0.js.gz"
        strategy="afterInteractive"
        onError={(e) => {
          console.error('Error loading Buying Buddy main script:', e);
        }}
        onLoad={() => {
          console.log('Buying Buddy script loaded successfully');
          // Manually trigger refresh after script loads
          if (window.MBB && typeof window.MBB.refresh === 'function') {
            setTimeout(() => {
              try {
                window.MBB.refresh();
                console.log('MBB refresh called');
              } catch (err) {
                console.error('Error calling MBB.refresh:', err);
              }
            }, 1000);
          }
        }}
      />
    </>
  );
}
