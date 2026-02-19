'use client';

import React from 'react';
import { ArrowRight, Terminal, GraduationCap } from 'lucide-react';
import { Section } from '../../types';

const HeroActions: React.FC = () => {
  const scrollTo = (id: string) => {
    window.dispatchEvent(
      new CustomEvent('portfolio-scroll', { detail: { id } })
    );
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-fade-left [animation-delay:360ms]">
      <div className="flex gap-4">
        <button
          onClick={() => scrollTo(Section.Projects)}
          className="px-6 md:px-8 py-3 md:py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/10 active:scale-95 text-xs md:text-base"
        >
          Projects <ArrowRight size={18} />
        </button>
        <button
          onClick={() => scrollTo(Section.Skills)}
          className="px-6 md:px-8 py-3 md:py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg font-bold flex items-center justify-center gap-2 transition-all border border-white/5 active:scale-95 text-xs md:text-base"
        >
          <Terminal size={18} /> Skills
        </button>
      </div>

      <div className="w-full lg:w-auto flex justify-center lg:justify-start">
        <button
          onClick={() => scrollTo(Section.Qualifications)}
          className="px-4 py-3 md:py-4 text-zinc-400 hover:text-white font-bold flex items-center justify-center gap-2 transition-all active:scale-95 text-xs md:text-base bg-transparent border-none"
        >
          <GraduationCap size={18} className="text-sky-500" /> Academics
        </button>
      </div>
    </div>
  );
};

export default HeroActions;
