"use client";

import React from 'react';
import { Award } from 'lucide-react';

const QualificationsSideInfo: React.FC = () => {
  return (
    <div className="lg:w-1/3">
      <div className="lg:sticky lg:top-32">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-[1px] bg-sky-500"></span>
          <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.2em]">Academic Pedigree</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
          Educational <br /> Foundation
        </h2>
        <p className="text-zinc-500 text-lg font-medium leading-relaxed mb-10">
          A rigorous academic foundation in Computer Engineering, focused on the intersection of hardware efficiency and high-level architectural scalability.
        </p>
        <div className="inline-flex items-center gap-4 p-6 bg-zinc-900/50 border border-white/5 rounded-lg mb-8">
          <Award className="text-sky-500" size={24} />
          <div>
            <p className="text-white font-bold text-sm">Distinction Honors</p>
            <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mt-1">Class of 2022</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualificationsSideInfo;