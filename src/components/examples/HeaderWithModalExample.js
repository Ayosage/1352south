'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchModal from '@/components/property/SearchModal';

export default function HeaderWithModal() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <>
      {/* Your Header Content */}
      <div className="hidden md:flex space-x-4">
        <Link 
          href="/#listings" 
          className="bg-transparent border border-amber-400 text-amber-400 py-2 px-4 rounded-none hover:bg-amber-400 hover:text-black transition-colors text-sm tracking-wider uppercase font-light"
        >
          Properties
        </Link>
        <button 
          onClick={() => setIsSearchModalOpen(true)}
          className="bg-transparent border border-amber-400 text-amber-400 py-2 px-4 rounded-none hover:bg-amber-400 hover:text-black transition-colors text-sm tracking-wider uppercase font-light"
        >
          Search
        </button>
        <Link 
          href="/#contact" 
          className="bg-transparent border border-amber-400 text-amber-400 py-2 px-4 rounded-none hover:bg-amber-400 hover:text-black transition-colors text-sm tracking-wider uppercase font-light"
        >
          Contact
        </Link>
      </div>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </>
  );
}
