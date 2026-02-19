'use client';

import React, { useState } from 'react';
import { Menu, X, FileDown } from 'lucide-react';
import NavLinks from './NavLinks';

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

            {/* Print CV — static link, no state needed */}
            <div className="px-4">
              <a
                href="/cv.pdf"
                download
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-500 hover:text-white transition-all text-sm font-bold w-full border border-zinc-800 hover:border-zinc-700"
              >
                <FileDown size={14} className="shrink-0 text-sky-500" />
                Print CV
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;
