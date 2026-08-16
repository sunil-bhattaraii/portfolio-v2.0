import React from 'react';
import { cookies } from 'next/headers';
import NavLinks from './header/NavLinks';
import AdminShield from './header/AdminShield';
import MobileMenu from './header/MobileMenu';
import PrintCvButton from './header/PrintCvButton';

const Header: React.FC = async () => {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('isAdmin')?.value === 'true';

  return (
    <header className="select-none fixed top-0 left-0 w-full z-50 bg-zinc-950/10 backdrop-blur-md border-b border-white/0 py-1 md:py-2 lg:py-3 xl:py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo + desktop nav links — client */}
        <NavLinks />

        {/* Right side: admin shield + Print CV + mobile menu */}
        <div className="flex items-center gap-2 md:gap-3">
          <AdminShield isAdmin={isAdmin} />
          <PrintCvButton className="hidden lg:flex" />

          {/* Mobile menu — client (hamburger toggle + sliding panel + nav links) */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
