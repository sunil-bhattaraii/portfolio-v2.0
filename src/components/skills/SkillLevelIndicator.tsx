"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SkillLevel } from '../../types';

interface SkillLevelIndicatorProps {
  level: SkillLevel;
}

const SkillLevelIndicator: React.FC<SkillLevelIndicatorProps> = ({ level }) => {
  const config = {
    Beginner: { count: 1, color: 'bg-red-500', shadow: 'shadow-[0_0_10px_rgba(239,68,68,0.5)]', text: 'text-red-500' },
    Intermediate: { count: 2, color: 'bg-orange-500', shadow: 'shadow-[0_0_10px_rgba(249,115,22,0.5)]', text: 'text-orange-500' },
    Experienced: { count: 3, color: 'bg-green-500', shadow: 'shadow-[0_0_10px_rgba(34,197,94,0.5)]', text: 'text-green-500' }
  };

  const { count, color, shadow, text } = config[level];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {[1, 2, 3].map((step) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.1 + step * 0.1, duration: 0.4 }}
            viewport={{ once: true }}
            className={`h-5 w-2 rounded-sm transition-all duration-500 ${
              step <= count ? `${color} ${shadow}` : 'bg-zinc-800'
            }`}
          />
        ))}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-[0.25em] ${text} opacity-90`}>
        {level}
      </span>
    </div>
  );
};

export default SkillLevelIndicator;