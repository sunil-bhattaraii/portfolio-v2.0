"use client";

import React from 'react';
import { Briefcase, CheckCircle2 } from 'lucide-react';

interface ExperienceDetailsProps {
  role: string;
  description: string[];
}

const ExperienceDetails: React.FC<ExperienceDetailsProps> = ({ role, description }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
          <Briefcase size={18} className="text-sky-500" />
        </div>
        <h4 className="text-2xl font-black text-zinc-100 tracking-tight">{role}</h4>
      </div>
      
      <ul className="space-y-4">
        {description.map((item, i) => (
          <li key={i} className="flex items-start gap-4 text-zinc-400 text-base leading-relaxed group-hover:text-zinc-300 transition-colors">
            <CheckCircle2 size={16} className="text-sky-500/50 mt-1 shrink-0 group-hover:text-sky-500 transition-colors" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceDetails;