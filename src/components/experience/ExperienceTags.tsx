"use client";

import React from 'react';

interface ExperienceTagsProps {
  skills: string[];
}

const ExperienceTags: React.FC<ExperienceTagsProps> = ({ skills }) => {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {skills.map(skill => (
        <span 
          key={skill} 
          className="px-2 py-1 bg-white/5 border border-white/5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest rounded-md group-hover:border-sky-500/20 group-hover:text-sky-500/80 transition-all"
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

export default ExperienceTags;