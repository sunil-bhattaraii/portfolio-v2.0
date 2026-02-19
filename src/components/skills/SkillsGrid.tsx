'use client';

import React, { useState } from 'react';
import { INITIAL_SKILLS } from '../../constants';
import { SkillCategory } from '../../types';
import SkillCard from './SkillCard';

const CATEGORIES: { label: string; value: 'All' | SkillCategory }[] = [
  { label: 'All', value: 'All' },
  { label: 'Core', value: 'Core' },
  { label: 'Frontend', value: 'Frontend' },
  { label: 'Backend', value: 'Backend' },
  { label: 'DevOps', value: 'DevOps' },
  { label: 'Design', value: 'Design' },
];

const SkillsGrid: React.FC = () => {
  const [active, setActive] = useState<'All' | SkillCategory>('Core');

  const filtered =
    active === 'All'
      ? INITIAL_SKILLS
      : INITIAL_SKILLS.filter((s) => s.categories.includes(active));

  return (
    <>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActive(value)}
            className={`px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border ${
              active === value
                ? 'bg-sky-500/10 border-sky-500/40 text-sky-400'
                : 'bg-transparent border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filtered.map((skill, index) => (
          <SkillCard key={skill.id} skill={skill} index={index} />
        ))}
      </div>
    </>
  );
};

export default SkillsGrid;
