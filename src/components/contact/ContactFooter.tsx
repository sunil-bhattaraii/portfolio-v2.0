"use client";

import React from 'react';

const ContactFooter: React.FC = () => {
  return (
    <footer className="w-full text-center bg-zinc-500/5 py-2">
        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} Sunil Bhattarai — v1.4.2
        </p>
    </footer>
  );
};

export default ContactFooter;
