"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Sparkles } from 'lucide-react';
import { INITIAL_SKILLS } from '../../constants';
import SkillCard from './SkillCard';

const SkillsGrid: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const highlightedSkills = INITIAL_SKILLS.filter(s => s.highlight);
  const otherSkills = INITIAL_SKILLS.filter(s => !s.highlight);

  return (
    <>
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {highlightedSkills.map((skill, index) => (
          <SkillCard key={skill.id} skill={skill} index={index} />
        ))}
        
        <AnimatePresence>
          {isExpanded && otherSkills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={highlightedSkills.length + index} />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-16 flex flex-col items-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className={`group flex items-center gap-3 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-500 border ${
            isExpanded 
            ? 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white' 
            : 'bg-sky-500/10 border-sky-500/20 text-sky-500 hover:bg-sky-500 hover:text-white hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]'
          }`}
        >
          {isExpanded ? (
            <>
              <Minus size={16} className="transition-transform group-hover:rotate-180 duration-500" />
              Show Less
            </>
          ) : (
            <>
              <Sparkles size={16} className="transition-transform group-hover:scale-125 duration-500" />
              Explore All Skills
            </>
          )}
        </motion.button>
        
        <div className="mt-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-800"></span>
          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
            {isExpanded ? 'Full capability map visible' : `${otherSkills.length} more specialized tools`}
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-800"></span>
        </div>
      </div>
    </>
  );
};

export default SkillsGrid;