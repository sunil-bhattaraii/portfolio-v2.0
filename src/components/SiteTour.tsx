'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import {
  TOUR_EVENT_BEGIN,
  TOUR_EVENT_NARRATE,
  TOUR_EVENT_STATUS,
  TOUR_EVENT_STOP,
  TOUR_STOPS,
} from '@/lib/site-tour';

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const SiteTour: React.FC = () => {
  const runningRef = useRef(false);

  const stopTour = useCallback(() => {
    runningRef.current = false;
    window.dispatchEvent(
      new CustomEvent(TOUR_EVENT_STATUS, { detail: { active: false } })
    );
  }, []);

  const runTour = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    window.dispatchEvent(
      new CustomEvent(TOUR_EVENT_STATUS, { detail: { active: true } })
    );

    for (let i = 0; i < TOUR_STOPS.length; i++) {
      if (!runningRef.current) return;
      const stop = TOUR_STOPS[i];

      window.dispatchEvent(
        new CustomEvent(TOUR_EVENT_NARRATE, {
          detail: { text: stop.message, duration: stop.dwellMs + 1500 },
        })
      );

      await wait(600);
      if (!runningRef.current) return;

      window.dispatchEvent(
        new CustomEvent('portfolio-scroll', { detail: { id: stop.id } })
      );
      document
        .getElementById(stop.id)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

      await wait(stop.dwellMs);
    }
    stopTour();
  }, [stopTour]);

  useEffect(() => {
    const handleBegin = () => {
      void runTour();
    };
    const handleStop = () => {
      if (runningRef.current) stopTour();
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && runningRef.current) stopTour();
    };
    window.addEventListener(TOUR_EVENT_BEGIN, handleBegin);
    window.addEventListener(TOUR_EVENT_STOP, handleStop);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener(TOUR_EVENT_BEGIN, handleBegin);
      window.removeEventListener(TOUR_EVENT_STOP, handleStop);
      window.removeEventListener('keydown', handleKey);
      runningRef.current = false;
    };
  }, [runTour, stopTour]);

  return null;
};

export default SiteTour;
