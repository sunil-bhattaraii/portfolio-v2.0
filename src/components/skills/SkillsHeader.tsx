"use client";

import React from 'react';

const SkillsHeader: React.FC = () => {
  return (
    <div className="mb-20 text-center md:text-left">
      <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
        <span className="w-8 h-px bg-sky-500"></span>
        <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.2em]">Core Expertise</span>
      </div>
      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">My Skills</h2>
    </div>
  );
};

export default SkillsHeader;
