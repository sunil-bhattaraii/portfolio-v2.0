"use client";

import React from 'react';

const ContactFooter: React.FC = () => {
  return (
    <footer className="grow-0 mt-20 p-2 border-t pt-10 border-white/5 w-full text-center">
        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} Sunil Bhattarai — v1.4.2
        </p>
    </footer>
  );
};

export default ContactFooter;
