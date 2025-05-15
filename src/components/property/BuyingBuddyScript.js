'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// This global variable will track the loading state of the MBB scripts
if (typeof window !== 'undefined') {
  window.MBB_LOADING_STATE = window.MBB_LOADING_STATE || {
    isLoaded: false,
    loadStarted: false,
    pendingRefreshes: [],
  };
}

// Global function that can be called from anywhere to refresh MBB
function initOrRefreshMBB() {
  if (typeof window === 'undefined') return;
  
  console.log('initOrRefreshMBB called, loading state:', window.MBB_LOADING_STATE);
  
  if (window.MBB && typeof window.MBB.refresh === 'function') {
    try {
      console.log('Executing MBB.refresh directly');
      window.MBB.refresh();
      return true;
    } catch (err) {
      console.error('Error refreshing MBB:', err);
    }
  } else if (window.MBB_LOADING_STATE && window.MBB_LOADING_STATE.isLoaded) {
    console.warn('MBB object partially initialized. Trying legacy initialization...');
    // Try to initialize manually if the scripts exist but MBB is not fully ready
    if (typeof window._MBB2 === 'function') {
      try {
        window._MBB2();
        return true;
      } catch (err) {
        console.error('Error initializing MBB via _MBB2:', err);
      }
    }
  } else {
    console.warn('MBB not fully loaded yet, queuing refresh for when ready');
    // Queue the refresh for when the scripts load
    if (window.MBB_LOADING_STATE) {
      window.MBB_LOADING_STATE.pendingRefreshes.push(true);
    }
  }
  return false;
}

// Make the function globally available
if (typeof window !== 'undefined') {
  window.initOrRefreshMBB = initOrRefreshMBB;
}

export default function BuyingBuddyScript() {
  const pathname = usePathname();
  
  // This effect runs when navigating back to a page with this component
  useEffect(() => {
    console.log('BuyingBuddyScript navigation effect running for path:', pathname);
    
    // On component mount or pathname change, try to refresh MBB
    const timeoutId = setTimeout(() => {
      initOrRefreshMBB();
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);
  
  const handleMainScriptLoad = () => {
    console.log('Main MBB script loaded');
    
    if (typeof window !== 'undefined') {
      window.MBB_LOADING_STATE.isLoaded = true;
      
      // Process any pending refreshes
      setTimeout(() => {
        if (window.MBB_LOADING_STATE.pendingRefreshes.length > 0) {
          console.log('Processing', window.MBB_LOADING_STATE.pendingRefreshes.length, 'pending refreshes');
          initOrRefreshMBB();
          window.MBB_LOADING_STATE.pendingRefreshes = [];
        }
      }, 500);
    }
  };
  
  return (
    <>
      <Script
        id="buying-buddy-css"
        src="https://www.mbb2.com/version3/css/theme/acid/KNdD0yub"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined') {
            window.MBB_LOADING_STATE.loadStarted = true;
          }
        }}
      />
      <Script
        id="buying-buddy-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var MBB = {
              seo: "false", 
              data: { acid: "KNdD0yub" },
              propertyClickHandler: function(propertyId) {
                window.location.href = "/listing-details?id=" + propertyId;
                return false;
              }
            };
            function mbbMapLoaded(){ if(window.MBB) window.MBB.googleMaps = true; };
          `
        }}
      />
      <Script
        id="google-maps"
        src="https://maps.googleapis.com/maps/api/js?callback=mbbMapLoaded&libraries=places"
        strategy="afterInteractive"
      />
      <Script
        id="buying-buddy-main"
        src="https://d2w6u17ngtanmy.cloudfront.net/scripts/my-buying-buddy.5.0.js.gz"
        strategy="afterInteractive"
        onLoad={handleMainScriptLoad}
      />
    </>
  );
}
  
