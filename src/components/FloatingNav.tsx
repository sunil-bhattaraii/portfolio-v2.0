"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Section } from '../types';

const SECTION_ORDER = [
  Section.Hero,
  Section.Skills,
  Section.Experience,
  Section.Qualifications,
  Section.Projects,
  Section.Contact
];

const FloatingNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.Hero);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      
      for (const sectionId of SECTION_ORDER) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(sectionId as Section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const currentIndex = SECTION_ORDER.indexOf(activeSection);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < SECTION_ORDER.length - 1;

  const navigate = (direction: 'next' | 'prev') => {
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    const targetId = SECTION_ORDER[nextIndex];
    
    if (targetId) {
      window.dispatchEvent(new CustomEvent('portfolio-scroll', { detail: { id: targetId } }));
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-[90] hidden lg:flex flex-col items-center gap-4"
        >
          <div className="absolute right-[-12px] top-0 bottom-0 w-[1px] bg-white/5 flex flex-col justify-between py-10">
            {SECTION_ORDER.map((s, i) => (
              <div 
                key={s} 
                className={`w-1 h-1 rounded-full transition-all duration-500 ${
                  i === currentIndex ? 'bg-sky-500 scale-150 shadow-[0_0_8px_#0ea5e9]' : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(14, 165, 233, 0.1)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('prev')}
            disabled={!hasPrev}
            className={`w-12 h-12 rounded-xl border border-white/10 glass flex items-center justify-center transition-all group ${
              !hasPrev ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:border-sky-500/50 text-zinc-500 hover:text-sky-400'
            }`}
          >
            <ChevronUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>

          <div className="h-12 flex items-center">
             <div className="w-[1px] h-6 bg-white/10"></div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(14, 165, 233, 0.1)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('next')}
            disabled={!hasNext}
            className={`w-12 h-12 rounded-xl border border-white/10 glass flex items-center justify-center transition-all group ${
              !hasNext ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:border-sky-500/50 text-zinc-500 hover:text-sky-400'
            }`}
          >
            <ChevronDown size={20} className="group-hover:translate-y-0.5 transition-transform" />
          </motion.button>
          
          <div className="mt-4 overflow-hidden h-4 w-20 flex justify-center">
            <motion.span 
              key={activeSection}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600 whitespace-nowrap"
            >
              {activeSection}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;