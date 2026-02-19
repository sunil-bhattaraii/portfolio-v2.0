"use client";

import React from 'react';
import { motion } from 'framer-motion';

const HeroTitle: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center lg:text-left"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-9xl font-black text-white mb-1 tracking-tighter leading-[0.85] select-none">
        Sunil <br className="hidden lg:block" />
        Bhattarai
      </h1>

      <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 md:mb-10 ml-1">
        <span className="w-8 md:w-10 h-1px bg-sky-500"></span>
        <span className="text-[10px] md:text-[11px] font-bold text-sky-500 uppercase tracking-[0.3em]">
          Fullstack Software Developer
        </span>
      </div>
    </motion.div>
  );
};

export default HeroTitle;
