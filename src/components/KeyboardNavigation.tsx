"use client";

import React, { useEffect, useRef } from 'react';
import { Section } from '../types';

const SECTION_ORDER = [
  Section.Hero,
  Section.Skills,
  Section.Experience,
  Section.Qualifications,
  Section.Projects,
  Section.Contact
];

const KeyboardNavigation: React.FC = () => {
  const isScrolling = useRef(false);
  const lastScrollY = useRef(0);
  const throttleTimeout = useRef<number | null>(null);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const getActiveSectionIndex = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      let activeIndex = 0;

      for (let i = 0; i < SECTION_ORDER.length; i++) {
        const element = document.getElementById(SECTION_ORDER[i]);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            activeIndex = i;
            break;
          }
        }
      }
      return activeIndex;
    };

    const scrollTo = (targetId: string, customLockDuration?: number) => {
      const element = document.getElementById(targetId);
      if (element && !isScrolling.current) {
        isScrolling.current = true;
        window.dispatchEvent(new CustomEvent('portfolio-scroll', { detail: { id: targetId, internal: true } }));
        element.scrollIntoView({ behavior: 'smooth' });
        const duration = customLockDuration || 1200;
        setTimeout(() => {
          isScrolling.current = false;
          lastScrollY.current = window.scrollY;
        }, duration);
      }
    };

    const handleExternalScroll = (e: any) => {
      if (e.detail?.internal) return;
      const targetId = e.detail?.id;
      if (targetId) {
        isScrolling.current = true;
        const duration = 1500;
        setTimeout(() => {
          isScrolling.current = false;
          lastScrollY.current = window.scrollY;
        }, duration);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
      if (isScrolling.current) return;
      const currentIndex = getActiveSectionIndex();
      let targetIndex = -1;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIndex < SECTION_ORDER.length - 1) targetIndex = currentIndex + 1;
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIndex > 0) targetIndex = currentIndex - 1;
      }
      if (targetIndex !== -1) { e.preventDefault(); scrollTo(SECTION_ORDER[targetIndex]); }
    };

    const handleScroll = () => {
      if (isScrolling.current || window.innerWidth < 1024) {
        lastScrollY.current = window.scrollY;
        return;
      }
      if (throttleTimeout.current) return;
      throttleTimeout.current = window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const direction = currentY > lastScrollY.current ? 'down' : 'up';
        const vh = window.innerHeight;
        if (Math.abs(currentY - lastScrollY.current) < 2) {
            lastScrollY.current = currentY; throttleTimeout.current = null; return;
        }
        for (let i = 0; i < SECTION_ORDER.length; i++) {
          const id = SECTION_ORDER[i]; const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (direction === 'down' && i < SECTION_ORDER.length - 1) {
            if (rect.bottom < vh * 0.85 && rect.bottom > vh * 0.15) { scrollTo(SECTION_ORDER[i + 1]); break; }
          }
          if (direction === 'up' && i > 0) {
            if (rect.top > vh * 0.15 && rect.top < vh * 0.85) { scrollTo(SECTION_ORDER[i - 1]); break; }
          }
        }
        lastScrollY.current = currentY; throttleTimeout.current = null;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('portfolio-scroll', handleExternalScroll);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('portfolio-scroll', handleExternalScroll);
      if (throttleTimeout.current) window.cancelAnimationFrame(throttleTimeout.current);
    };
  }, []);
  return null;
};
export default KeyboardNavigation;