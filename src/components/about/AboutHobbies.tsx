'use client';

import React from 'react';
import {
  Music,
  Crown as Chess,
  BookOpen,
  Gamepad2,
  Camera,
  Mountain,
} from 'lucide-react';

const hobbies = [
  {
    icon: <Music size={20} />,
    title: 'Music',
    color: 'from-violet-500/10 to-transparent',
    accent: 'text-violet-400',
    border: 'hover:border-violet-500/30',
  },
  {
    icon: <Chess size={20} />,
    title: 'Chess',
    color: 'from-orange-500/10 to-transparent',
    accent: 'text-orange-400',
    border: 'hover:border-orange-500/30',
  },
  {
    icon: <BookOpen size={20} />,
    title: 'Reading',
    color: 'from-emerald-500/10 to-transparent',
    accent: 'text-emerald-400',
    border: 'hover:border-emerald-500/30',
  },
  {
    icon: <Gamepad2 size={20} />,
    title: 'Gaming',
    color: 'from-sky-500/10 to-transparent',
    accent: 'text-sky-400',
    border: 'hover:border-sky-500/30',
  },
  {
    icon: <Camera size={20} />,
    title: 'Photography',
    color: 'from-pink-500/10 to-transparent',
    accent: 'text-pink-400',
    border: 'hover:border-pink-500/30',
  },
  {
    icon: <Mountain size={20} />,
    title: 'Hiking',
    color: 'from-lime-500/10 to-transparent',
    accent: 'text-lime-400',
    border: 'hover:border-lime-500/30',
  },
];

const AboutHobbies: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <span className="w-6 h-px bg-zinc-600" />
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
          Outside the editor
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {hobbies.map((hobby, i) => (
          <div
            key={i}
            className={`relative group p-4 bg-zinc-950/40 border border-white/5 ${hobby.border} rounded-2xl overflow-hidden transition-all duration-400 hover:bg-zinc-900/50`}
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${hobby.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />
            <div className="relative flex items-center gap-3">
              <div
                className={`shrink-0 p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-300 ${hobby.accent}`}
              >
                {hobby.icon}
              </div>
              <h4 className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                {hobby.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutHobbies;
