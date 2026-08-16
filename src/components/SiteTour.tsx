'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Square } from 'lucide-react';
import {
  DEFAULT_CORNER,
  TOUR_EVENT_BEGIN,
  TOUR_EVENT_CORNER,
  TOUR_EVENT_NARRATE,
  TOUR_EVENT_STATUS,
  TOUR_STOPS,
} from '@/lib/site-tour';

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const SiteTour: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [stopIndex, setStopIndex] = useState(-1);
  const runningRef = useRef(false);

  const stopTour = useCallback(() => {
    runningRef.current = false;
    setIsRunning(false);
    setStopIndex(-1);
    window.dispatchEvent(
      new CustomEvent(TOUR_EVENT_STATUS, { detail: { active: false } })
    );
    window.dispatchEvent(
      new CustomEvent(TOUR_EVENT_CORNER, { detail: { corner: DEFAULT_CORNER } })
    );
  }, []);

  const runTour = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setIsRunning(true);
    setStopIndex(0);
    window.dispatchEvent(
      new CustomEvent(TOUR_EVENT_STATUS, { detail: { active: true } })
    );

    for (let i = 0; i < TOUR_STOPS.length; i++) {
      if (!runningRef.current) return;
      const stop = TOUR_STOPS[i];
      setStopIndex(i);

      window.dispatchEvent(
        new CustomEvent(TOUR_EVENT_CORNER, { detail: { corner: stop.corner } })
      );
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
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && runningRef.current) stopTour();
    };
    window.addEventListener(TOUR_EVENT_BEGIN, handleBegin);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener(TOUR_EVENT_BEGIN, handleBegin);
      window.removeEventListener('keydown', handleKey);
      runningRef.current = false;
    };
  }, [runTour, stopTour]);

  if (!isRunning) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[1300] flex items-center gap-3 px-4 py-2.5 rounded-full bg-zinc-900/95 backdrop-blur-md border border-sky-500/30 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] select-none">
      <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
      <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
        Showing you around
        <span className="text-sky-400 ml-1.5">
          {stopIndex + 1}/{TOUR_STOPS.length}
        </span>
      </span>
      <button
        onClick={stopTour}
        className="ml-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-[10px] font-black uppercase tracking-wider text-sky-400 hover:bg-sky-500/20 transition-colors"
      >
        <Square size={10} fill="currentColor" />
        Stop
      </button>
    </div>
  );
};

export default SiteTour;
