'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function BuyingBuddyScript() {
  const pathname = usePathname();
  
  // This effect runs when navigating back to a page with this component
  useEffect(() => {
    // Small delay to ensure scripts have loaded
    const timeoutId = setTimeout(() => {
      if (window.MBB && typeof window.MBB.refresh === 'function') {
        try {
          console.log('Explicit MBB refresh after navigation to:', pathname);
          window.MBB.refresh();
        } catch (err) {
          console.error('Error refreshing MBB after navigation:', err);
        }
      } else {
        console.warn('MBB not available for refresh after navigation');
      }
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);
  
  return (
    <>
      <Script
        id="buying-buddy-css"
        src="https://www.mbb2.com/version3/css/theme/acid/KNdD0yub"
        strategy="afterInteractive"
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
        onLoad={() => {
          console.log('Buying Buddy script loaded successfully');
          // Allow some time for script to fully initialize before refreshing
          setTimeout(() => {
            if (window.MBB && typeof window.MBB.refresh === 'function') {
              try {
                console.log('Initial MBB.refresh called');
                window.MBB.refresh();
              } catch (err) {
                console.error('Error on initial MBB refresh:', err);
              }
            }
          }, 500);
        }}
      />
    </>
  );
}
