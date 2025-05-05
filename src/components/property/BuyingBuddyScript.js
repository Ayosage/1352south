'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

export default function BuyingBuddyScript() {
  const pathname = usePathname();
  
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
      />
      <Script
        id="buying-buddy-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var MBB = {seo : "false",data:{ acid : "KNdD0yub" } };
            function mbbMapLoaded(){ MBB.googleMaps = true; };
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
      />
    </>
  );
}
