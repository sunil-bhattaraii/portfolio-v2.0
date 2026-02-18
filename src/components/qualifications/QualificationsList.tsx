"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Plus, Minus } from 'lucide-react';
import QualificationItem from './QualificationItem';
import { INITIAL_QUALIFICATIONS } from '../../constants';

const QualificationsList: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mainDegrees = INITIAL_QUALIFICATIONS.filter(q => q.type === 'degree');
  const certifications = INITIAL_QUALIFICATIONS.filter(q => q.type === 'certification');

  return (
    <div className="lg:w-2/3 border-l border-white/5 min-h-[400px]">
      <div className="space-y-0">
        {mainDegrees.map((q, idx) => (
          <QualificationItem key={q.id} q={q} index={idx} />
        ))}
      </div>

      <div className="relative pl-12 pb-12 mt-4">
        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-zinc-800 border border-white/10 rounded-full group-hover:bg-sky-500 transition-all duration-300"></div>
        <motion.button
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className={`group flex items-center gap-4 px-8 py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 border ${
            isExpanded
              ? 'bg-sky-500 border-sky-400 text-white shadow-[0_0_25px_rgba(14,165,233,0.3)]'
              : 'bg-zinc-900 border-white/5 text-zinc-400 hover:text-sky-500 hover:border-sky-500/30'
          }`}
        >
          <div className="flex items-center gap-3">
            {isExpanded ? <Minus size={16} /> : <Plus size={16} />}
            <span>{isExpanded ? 'Collapse specialized courses' : `Show ${certifications.length} certifications`}</span>
          </div>
          < GraduationCap size={16} className={isExpanded ? 'text-white' : 'text-sky-500/50'} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-8 space-y-0 border-t border-white/5">
              <div className="flex items-center gap-3 pl-12 mb-12">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_#0ea5e9]"></div>
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Professional Certifications</h4>
              </div>
              {certifications.map((q, idx) => (
                <QualificationItem key={q.id} q={q} index={mainDegrees.length + idx} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QualificationsList;