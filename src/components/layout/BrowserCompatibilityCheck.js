'use client';

import { useEffect, useState } from 'react';

export default function BrowserCompatibilityCheck() {
  const [browserInfo, setBrowserInfo] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    // Get browser info
    const ua = navigator.userAgent;
    const browserData = {
      name: 'unknown',
      version: 'unknown',
      mobile: /Mobile|Android|iPhone|iPad/i.test(ua),
      ssl: window.location.protocol === 'https:',
      userAgent: ua
    };
    
    // Detect browser and version
    if (ua.indexOf('Firefox') > -1) {
      browserData.name = 'Firefox';
      const match = ua.match(/Firefox\/([\d.]+)/);
      if (match) browserData.version = match[1];
    } else if (ua.indexOf('SamsungBrowser') > -1) {
      browserData.name = 'Samsung Internet';
      const match = ua.match(/SamsungBrowser\/([\d.]+)/);
      if (match) browserData.version = match[1];
    } else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) {
      browserData.name = 'Opera';
      const match = ua.match(/(?:Opera|OPR)\/([\d.]+)/);
      if (match) browserData.version = match[1];
    } else if (ua.indexOf('Trident') > -1) {
      browserData.name = 'Internet Explorer';
      const match = ua.match(/rv:([\d.]+)/);
      if (match) browserData.version = match[1];
    } else if (ua.indexOf('Edge') > -1) {
      browserData.name = 'Edge';
      const match = ua.match(/Edge\/([\d.]+)/);
      if (match) browserData.version = match[1];
    } else if (ua.indexOf('Chrome') > -1) {
      browserData.name = 'Chrome';
      const match = ua.match(/Chrome\/([\d.]+)/);
      if (match) browserData.version = match[1];
    } else if (ua.indexOf('Safari') > -1) {
      browserData.name = 'Safari';
      const match = ua.match(/Version\/([\d.]+)/);
      if (match) browserData.version = match[1];
    }
    
    // Set browser info
    setBrowserInfo(browserData);
    
    // Check for known problematic browser/device combinations
    const isSSLIssue = (
      // Safari on macOS is known to have TLS negotiation issues with some sites
      (browserData.name === 'Safari' && !browserData.mobile && ua.indexOf('Macintosh') > -1) ||
      // Internet Explorer has known SSL issues
      browserData.name === 'Internet Explorer' ||
      // Older versions of browsers may have issues with modern TLS
      (browserData.name === 'Chrome' && parseFloat(browserData.version) < 70) ||
      (browserData.name === 'Firefox' && parseFloat(browserData.version) < 60)
    );
    
    // PR_CONNECT_RESET_ERROR is often related to proxy settings, firewall rules or antivirus software
    const isPotentialProxyIssue = (
      // Check if we're on desktop where proxy/firewall is more common
      !browserData.mobile && 
      (
        browserData.name === 'Chrome' || 
        browserData.name === 'Firefox' || 
        browserData.name === 'Safari'
      )
    );
    
    // Show warning based on detected issues
    setShowWarning(isSSLIssue || isPotentialProxyIssue);
    
    // Log browser info to console for debugging
    console.log('Browser diagnostic info:', browserData);
    
    // Try to detect any TLS/SSL configuration issues
    const detectSSLIssues = async () => {
      try {
        // Test fetch to our site
        const response = await fetch(window.location.origin + '/test.html', {
          method: 'HEAD',
          cache: 'no-store'
        });
        console.log('SSL test result:', response.ok ? 'Success' : 'Failed');
      } catch (error) {
        console.error('SSL test error:', error.message);
        // If we catch an error here, it's likely SSL related
        setShowWarning(true);
      }
    };
    
    detectSSLIssues();
    
  }, []);
  
  if (!showWarning) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-amber-400 text-white p-4 z-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="mb-3 md:mb-0">
            <h3 className="text-amber-400 font-light text-lg">Connection Issue Detected</h3>
            <p className="text-sm mt-1">
              You&apos;re using {browserInfo?.name} {browserInfo?.version} which may be experiencing connection issues with this site.
            </p>
            <div className="text-xs mt-2 text-gray-300">
              <ul className="list-disc list-inside">
                <li>Try disabling any security software, VPN, or proxy temporarily</li>
                <li>Try using Chrome, Firefox, or viewing on a mobile device</li>
                <li>Clear your browser cache and cookies</li>
                <li>Check your firewall settings</li>
              </ul>
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowWarning(false)}
              className="bg-transparent border border-amber-400 text-amber-400 px-4 py-2 text-sm hover:bg-amber-400 hover:text-black transition-colors"
            >
              Dismiss
            </button>
            <a 
              href="/test.html" 
              target="_blank"
              className="bg-amber-400 text-black px-4 py-2 text-sm hover:bg-amber-500 transition-colors"
            >
              Test Connection
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
