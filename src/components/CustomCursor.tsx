'use client';

import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
      if (pointerRef.current) {
        pointerRef.current.style.left = `${e.clientX}px`;
        pointerRef.current.style.top = `${e.clientY}px`;
      }
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
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
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <div
        ref={glowRef}
        className={`absolute w-16 h-16 bg-sky-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${isHovered ? 'scale-[2.5] opacity-[0.35]' : 'scale-[1.2] opacity-[0.15]'}`}
      />

      <div
        ref={pointerRef}
        className={`absolute w-8 h-8 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ${isHovered ? 'scale-[1.2] -rotate-[5deg]' : ''}`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ imageRendering: 'pixelated' }}
        >
          <path
            d="M2 2V20L6 16L10 22L12 21L8 15H14L2 2Z"
            fill="#050508"
            stroke="#050508"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M2 2V20L6 16L10 22L12 21L8 15H14L2 2Z" fill="#0ea5e9" />
          <path
            d="M3 4V16L6 13L9 18L10 17L7 12H11L3 4Z"
            fill="#38bdf8"
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
};

export default CustomCursor;
