"use client";

import React from 'react';

const ProjectsHeader: React.FC = () => {
  return (
    <div className="mb-20">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-8 h-[1px] bg-sky-500"></span>
        <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.2em]">Deployment Log</span>
      </div>
      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Case Studies</h2>
    </div>
  );
};

export default ProjectsHeader;