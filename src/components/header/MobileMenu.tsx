'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import NavLinks from './NavLinks';
import PrintCvButton from './PrintCvButton';

const MobileMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden text-zinc-400 p-2"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-30 h-screen w-screen backdrop-blur-[2px] lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed right-0 top-12.5 md:top-14.5 h-screen w-60 bg-zinc-950 border-l border-zinc-800 z-40 lg:hidden flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            <NavLinks mobile onNavigate={() => setOpen(false)} />

            {/* Print CV — opens the printable CV page */}
            <div className="px-4">
              <PrintCvButton onNavigate={() => setOpen(false)} className="w-full" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;
