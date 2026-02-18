"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer');
      
      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', () => setIsHovered(false));
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <motion.div
        style={{ 
          left: cursorX, 
          top: cursorY, 
          translateX: '-50%', 
          translateY: '-50%' 
        }}
        animate={{ 
          scale: isHovered ? 2.5 : 1.2, 
          opacity: isHovered ? 0.35 : 0.15 
        }}
        className="absolute w-16 h-16 bg-sky-500 rounded-full blur-3xl transition-transform duration-200 ease-out"
      />

      <motion.div
        style={{ 
          left: cursorX, 
          top: cursorY,
          x: 0,
          y: 0
        }}
        animate={{ 
          scale: isHovered ? 1.2 : 1, 
          rotate: isHovered ? -5 : 0 
        }}
        className="absolute w-8 h-8 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          style={{ imageRendering: 'pixelated' }}
        >
          <path d="M2 2V20L6 16L10 22L12 21L8 15H14L2 2Z" fill="#050508" stroke="#050508" strokeWidth="2" strokeLinejoin="round" />
          <path d="M2 2V20L6 16L10 22L12 21L8 15H14L2 2Z" fill="#0ea5e9" />
          <path d="M3 4V16L6 13L9 18L10 17L7 12H11L3 4Z" fill="#38bdf8" opacity="0.4" />
        </svg>
      </motion.div>
    </div>
  );
};

export default CustomCursor;