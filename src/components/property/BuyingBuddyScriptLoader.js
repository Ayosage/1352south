'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function BuyingBuddyScriptLoader() {
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://www.mbb2.com/version3/css/theme/acid/KNdD0yub';
    document.head.appendChild(linkElement);

    window.MBB = {
      seo: "false", 
      data: {acid: "KNdD0yub"},
      propertyClickHandler: function(propertyId) {
        router.push(`/listing-details?id=${propertyId}`);
        return false;
      }
    };
    
    window.mbbMapLoaded = function() { 
      if (window.MBB) window.MBB.googleMaps = true;
    };

    const mapsScript = document.createElement('script');
    mapsScript.src = 'https://maps.googleapis.com/maps/api/js?callback=mbbMapLoaded&libraries=places';
    document.head.appendChild(mapsScript);

    const mainScript = document.createElement('script');
    mainScript.src = 'https://d2w6u17ngtanmy.cloudfront.net/scripts/my-buying-buddy.5.0.js.gz';
    mainScript.onload = function() {
      if (window.MBB && typeof window.MBB.refresh === 'function') {
        setTimeout(() => window.MBB.refresh(), 500);
      }
    };
    document.head.appendChild(mainScript);

    // Cleanup
    return () => {
      try {
        document.head.removeChild(linkElement);
        document.head.removeChild(mapsScript);
        document.head.removeChild(mainScript);
      } catch (e) {
        // Elements might already be removed
      }
    };
  }, [pathname, router]);

  return null; // No UI needed
}
