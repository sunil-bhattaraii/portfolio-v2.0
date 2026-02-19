'use client';

import React, { useState } from 'react';
import { Mail, Menu, X, Terminal, FileDown, ChevronRight } from 'lucide-react';
import { Section } from '../types';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(Section.Hero);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    Section.Skills,
    Section.Experience,
    Section.Qualifications,
    Section.Projects,
    Section.Contact,
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-zinc-950/10 backdrop-blur-md border-b border-white/0 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollTo(Section.Hero)}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all shadow-[0_0_15px_rgba(14,165,233,0.1)] group-hover:shadow-[0_0_20px_rgba(14,165,233,0.2)] bg-sky-500/10 border-sky-500/20 group-hover:border-sky-500/50">
              <Terminal
                size={18}
                className="text-sky-500 transition-transform group-hover:scale-110"
              />
            </div>
            <span className="text-xl font-black tracking-tight transition-colors text-white group-hover:text-sky-400">
              linus.dev
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((s) => {
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
                    className={`absolute -bottom-1 left-0 h-[1px] bg-sky-500 transition-all duration-500 ${
                      isActive
                        ? 'w-full shadow-[0_0_8px_rgba(14,165,233,0.8)]'
                        : 'w-0 group-hover:w-full'
                    }`}
                  ></span>

                  {isActive && (
                    <span className="absolute -top-1 -right-2 w-1 h-1 bg-sky-500 rounded-full animate-pulse shadow-[0_0_5px_#0ea5e9]"></span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <a
              href="mailto:bhattaraisunil76@gmail.com"
              className="group relative px-7 py-3 bg-zinc-950 hover:bg-sky-600 text-white text-[11px] font-black uppercase tracking-widest rounded-full border border-sky-500/30 transition-all hover:border-sky-500 hover:shadow-[0_0_25px_rgba(14,165,233,0.25)] flex items-center gap-3 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-3 transition-all duration-300 relative z-10">
                <Mail
                  size={14}
                  className="text-sky-500 group-hover:text-white transition-colors"
                />
                <span>Mail Me</span>
              </div>
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:left-[200%]"></div>
            </a>
          </div>

          <button
            className="lg:hidden text-zinc-400 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>


      {mobileMenuOpen && (
        <div className="">
          <div
            className="fixed inset-0 bg-black/60 z-30 h-screen w-screen backdrop-blur-[2px] lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed right-0 top-17.5 h-screen w-60 bg-zinc-950 border-l border-zinc-800 z-40 lg:hidden flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Nav links */}
            <nav className="flex flex-col px-3 py-4 gap-1">
              {[Section.Hero, ...navLinks].map((s) => {
                const isActive = activeSection === s;
                return (
                  <button
                    key={s}
                    onClick={() => scrollTo(s)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold capitalize transition-all text-left ${
                      isActive
                        ? 'bg-sky-500/10 text-sky-400'
                        : 'text-zinc-500 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    <ChevronRight
                      size={12}
                      className={`flex-shrink-0 transition-colors ${isActive ? 'text-sky-500' : 'text-zinc-700'}`}
                    />
                    {s}
                  </button>
                );
              })}
            </nav>

            {/* Download CV */}
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
        </div>
      )}
    </>
  );
};

export default Header;
