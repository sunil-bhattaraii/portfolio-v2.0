'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { Experience } from '../../types';
import ExperienceTags from './ExperienceTags';
import ExperienceDetails from './ExperienceDetails';

interface ExperienceCardProps {
  exp: Experience;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp, index }) => {
  return (
    <div className="group relative grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 p-8 md:p-12 bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 hover:border-sky-500/30 transition-all rounded-2xl overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[10px] font-bold text-sky-500 uppercase tracking-widest mono">
          <Calendar size={14} />
          {exp.duration}
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
          {exp.company}
        </h3>
        <ExperienceTags skills={exp.skills} />
      </div>

      <ExperienceDetails role={exp.role} description={exp.description} />
    </div>
  );
};

export default ExperienceCard;
