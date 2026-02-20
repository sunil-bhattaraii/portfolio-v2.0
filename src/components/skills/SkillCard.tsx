'use client';

import React from 'react';
import { Skill } from '../../types';
import { getIcon } from '../../constants';
import SkillLevelIndicator from './SkillLevelIndicator';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => (
  <div
    className="animate-fade-up p-5 bg-zinc-950/40 border border-white/5 hover:bg-zinc-900/60 transition-all duration-500 group rounded-2xl flex flex-col items-center text-center relative overflow-hidden h-full"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <div
      className={`absolute -top-8 -right-8 w-16 h-16 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${
        skill.level === 'Beginner'
          ? 'bg-red-500'
          : skill.level === 'Intermediate'
            ? 'bg-orange-500'
            : 'bg-green-500'
      }`}
    />



    <h3 className="text-sm font-bold text-white tracking-tight mb-5 group-hover:text-sky-400 transition-colors duration-300 leading-snug">
      {skill.name}
    </h3>

    <div className="mt-auto w-full">
      <SkillLevelIndicator level={skill.level} />
    </div>
  </div>
);

export default SkillCard;
