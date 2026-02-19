"use client";

import React from 'react';
import { SkillLevel } from '../../types';

interface SkillLevelIndicatorProps {
  level: SkillLevel;
}

const SkillLevelIndicator: React.FC<SkillLevelIndicatorProps> = ({ level }) => {
  const config = {
    Beginner:     { width: 'w-1/3',  color: 'bg-red-500',    glow: 'shadow-[0_0_8px_rgba(239,68,68,0.5)]',   text: 'text-red-500' },
    Intermediate: { width: 'w-2/3',  color: 'bg-orange-500', glow: 'shadow-[0_0_8px_rgba(249,115,22,0.5)]',  text: 'text-orange-500' },
    Experienced:  { width: 'w-full', color: 'bg-green-500',  glow: 'shadow-[0_0_8px_rgba(34,197,94,0.5)]',   text: 'text-green-500' },
  };

  const { width, color, glow, text } = config[level];

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${width} ${color} ${glow}`} />
      </div>
      <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${text}`}>
        {level}
      </span>
    </div>
  );
};

export default SkillLevelIndicator;
