"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ScrollIndicatorProps {
  targetId: string;
  direction?: 'up' | 'down';
  isVisible?: boolean;
  showOnMobile?: boolean;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  targetId,
  direction = 'down',
  isVisible = true,
  showOnMobile = false
}) => {
  const scrollTo = () => {
    window.dispatchEvent(new CustomEvent('portfolio-scroll', { detail: { id: targetId } }));
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Icon = direction === 'up' ? ChevronUp : ChevronDown;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 ${showOnMobile ? 'flex' : 'hidden lg:flex'}`}
        >
          <motion.button
            onClick={scrollTo}
            animate={{
              y: direction === 'down' ? [0, 8, 0] : [0, -8, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(14, 165, 233, 0.15)",
              borderColor: "rgba(14, 165, 233, 0.6)"
            }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-sky-500 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.5)] group"
            aria-label={`Scroll to ${targetId}`}
          >
            <Icon
              size={28}
              className={`group-hover:text-white transition-colors ${direction === 'down' ? 'translate-y-0.5' : '-translate-y-0.5'}`}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollIndicator;
