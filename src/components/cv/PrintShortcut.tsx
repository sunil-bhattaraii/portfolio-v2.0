'use client';

import React, { useEffect } from 'react';

const PrintShortcut: React.FC = () => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        if (window.location.pathname === '/cv') return;
        e.preventDefault();
        e.stopPropagation();
        window.location.assign('/cv?print=1');
      }
    };
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, []);

  return null;
};

export default PrintShortcut;
