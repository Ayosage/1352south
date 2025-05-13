'use client';

import Script from 'next/script';
import { useRouter } from 'next/navigation';

export default function BuyingBuddyScript() {
  const router = useRouter();
  
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
      />
    </>
  );
}
