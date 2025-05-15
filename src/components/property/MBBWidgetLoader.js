'use client';

import { useEffect } from 'react';

export default function MBBWidgetLoader() {
  useEffect(() => {
    // Use a short delay to allow the page to fully render
    const timeoutId = setTimeout(() => {
      console.log('MBBWidgetLoader trying to initialize widget');
      if (
        typeof window !== 'undefined' && 
        typeof window.initOrRefreshMBB === 'function'
      ) {
        window.initOrRefreshMBB();
      } else if (typeof window !== 'undefined' && window.MBB && typeof window.MBB.refresh === 'function') {
        try {
          console.log('MBBWidgetLoader using direct MBB.refresh');
          window.MBB.refresh();
        } catch (err) {
          console.error('Error refreshing MBB from widget loader:', err);
        }
      } else {
        console.warn('MBB not available yet in MBBWidgetLoader');
        
        // Final fallback - try direct initialization
        if (document.getElementById('MBBv3_FeaturedList') && typeof window._MBB2 === 'function') {
          try {
            console.log('MBBWidgetLoader attempting direct _MBB2 initialization');
            window._MBB2();
          } catch (err) {
            console.error('Error with direct MBB2 initialization:', err);
          }
        }
      }
    }, 1200);
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  return null; // No visible UI
}
