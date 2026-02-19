import React from 'react';
import { Mail } from 'lucide-react';
import NavLinks from './header/NavLinks';
import MobileMenu from './header/MobileMenu';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-zinc-950/10 backdrop-blur-md border-b border-white/0 py-1 md:py-2 lg:py-3 xl:py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo + desktop nav links — client */}
        <NavLinks />

        {/* Mail Me — server-rendered static link */}
        <a
          href="mailto:bhattaraisunil76@gmail.com"
          className="group relative px-7 py-3 bg-zinc-950 hover:bg-sky-600 text-white text-[11px] font-black uppercase tracking-widest rounded-full border border-sky-500/30 transition-all hover:border-sky-500 hover:shadow-[0_0_25px_rgba(14,165,233,0.25)] hidden lg:flex items-center gap-3 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-tr from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-3 transition-all duration-300 relative z-10">
            <Mail
              size={14}
              className="text-sky-500 group-hover:text-white transition-colors"
            />
            <span>Mail Me</span>
          </div>
          <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:left-[200%]" />
        </a>

        {/* Mobile menu — client (hamburger toggle + sliding panel + nav links) */}
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
