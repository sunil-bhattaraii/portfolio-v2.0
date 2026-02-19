'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Terminal } from 'lucide-react';
import { Section } from '../../types';

interface NavLinksProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

const navLinks = [
  Section.Skills,
  Section.Experience,
  Section.Qualifications,
  Section.Projects,
  Section.Contact,
];

const NavLinks: React.FC<NavLinksProps> = ({ mobile = false, onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>(() =>
    typeof window !== 'undefined'
      ? (sessionStorage.getItem('nav-active') ?? Section.Hero)
      : Section.Hero
  );

  useEffect(() => {
    const handler = (e: Event) =>
      setActiveSection((e as CustomEvent<string>).detail);
    window.addEventListener('nav-section-change', handler);
    return () => window.removeEventListener('nav-section-change', handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el)
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    sessionStorage.setItem('nav-active', id);
    setActiveSection(id);
    window.dispatchEvent(
      new CustomEvent<string>('nav-section-change', { detail: id })
    );
    onNavigate?.();
  };

  const allLinks = mobile ? [Section.Hero, ...navLinks] : navLinks;

  if (mobile) {
    return (
      <nav className="flex flex-col px-3 py-4 gap-1">
        {allLinks.map((s) => {
          const isActive = activeSection === s;
          return (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold capitalize transition-all text-left w-full ${
                isActive
                  ? 'bg-sky-500/10 text-sky-400'
                  : 'text-zinc-500 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <ChevronRight
                size={12}
                className={`shrink-0 transition-colors ${isActive ? 'text-sky-500' : 'text-zinc-700'}`}
              />
              {s}
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <>
      {/* Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => scrollTo(Section.Hero)}
      >
        <div className="w-fit p-1 aspect-square rounded-lg flex items-center justify-center group-hover:border-sky-500/50">
          <Terminal className="text-sky-500 h-3.75 lg:h-4.5 transition-transform group-hover:scale-110" />
        </div>
        <span className="text-xl font-black tracking-tight transition-colors text-white group-hover:text-sky-400">
          linus.dev
        </span>
      </div>

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-10">
        {allLinks.map((s) => {
          const isActive = activeSection === s;
          return (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className={`relative text-[11px] font-bold transition-all uppercase tracking-[0.25em] group ${
                isActive ? 'text-white' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {s}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-sky-500 transition-all duration-500 ${
                  isActive
                    ? 'w-full shadow-[0_0_8px_rgba(14,165,233,0.8)]'
                    : 'w-0 group-hover:w-full'
                }`}
              />
              {isActive && (
                <span className="absolute -top-1 -right-2 w-1 h-1 bg-sky-500 rounded-full animate-pulse shadow-[0_0_5px_#0ea5e9]" />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default NavLinks;
