"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../types';
import { getIcon } from '../../constants';
import SkillLevelIndicator from './SkillLevelIndicator';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    className="p-8 md:p-10 bg-zinc-950/40 border border-white/5 hover:bg-zinc-900/60 transition-all duration-500 group rounded-4xl flex flex-col items-center text-center relative overflow-hidden h-full shadow-2xl"
  >
    <div className={`absolute -top-12 -right-12 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${
      skill.level === 'Beginner' ? 'bg-red-500' : skill.level === 'Intermediate' ? 'bg-orange-500' : 'bg-green-500'
    }`} />

    <div className="mb-6 p-4 bg-white/5 rounded-2xl text-sky-500 border border-white/5 group-hover:border-sky-500/30 group-hover:scale-110 group-hover:bg-sky-500/10 transition-all duration-500">
      {getIcon(skill.icon)}
    </div>

    <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-8 group-hover:text-sky-400 transition-colors duration-300 leading-none">
      {skill.name}
    </h3>

    <div className="mt-auto w-full">
      <SkillLevelIndicator level={skill.level} />
    </div>
  </motion.div>
);

export default SkillCard;
