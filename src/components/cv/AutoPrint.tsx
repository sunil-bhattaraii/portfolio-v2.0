'use client';

import React, { useEffect } from 'react';

const AutoPrint: React.FC = () => {
  useEffect(() => {
    if (!window.location.search.includes('print=1')) return;
    history.replaceState(null, '', window.location.pathname);
    const timer = setTimeout(() => window.print(), 400);
    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default AutoPrint;
