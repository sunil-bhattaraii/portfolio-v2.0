"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import ScrollIndicator from './ScrollIndicator';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  scrollTargetId?: string;
  scrollDirection?: 'up' | 'down';
  showIndicatorOnMobile?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  id, 
  children, 
  className = "", 
  maxWidth = "max-w-screen-2xl",
  scrollTargetId,
  scrollDirection = 'down',
  showIndicatorOnMobile = false
}) => {
  const ref = useRef(null);
  // Using a higher margin to ensure content triggers visibility earlier
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    }
  }, [isInView, controls, hasAnimated]);

  // Fallback for first section to ensure it's never black on load
  useEffect(() => {
    if (id === 'hero') {
      const timer = setTimeout(() => {
        controls.start("visible");
        setHasAnimated(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [id, controls]);

  return (
    <section
      id={id}
      ref={ref}
      className={`min-h-screen w-full flex flex-col items-center justify-start md:justify-center pt-32 pb-20 px-6 md:px-12 lg:px-16 overflow-hidden relative ${className}`}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full ${maxWidth} mx-auto flex-1 flex flex-col justify-center`}
      >
        {children}
      </motion.div>

      {scrollTargetId && (
        <ScrollIndicator 
          targetId={scrollTargetId} 
          direction={scrollDirection} 
          isVisible={isInView}
          showOnMobile={showIndicatorOnMobile}
        />
      )}
    </section>
  );
};

export default SectionWrapper;