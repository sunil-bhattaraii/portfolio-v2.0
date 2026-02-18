"use client";

import React from 'react';

const ContactFooter: React.FC = () => {
  return (
    <footer className="mt-20 pt-12 border-t border-white/5 w-full flex flex-col md:flex-row items-center justify-between gap-8 pb-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>
        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} Sunil Bhattarai — v1.4.2
        </p>
      </div>
      <div className="flex gap-10 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
         <span className="hover:text-sky-400 cursor-pointer transition-colors mono tracking-tighter">OPEN_FOR_COLLABORATION</span>
         <span className="hover:text-sky-400 cursor-pointer transition-colors mono tracking-tighter">BASED_IN_KATHMANDU</span>
      </div>
    </footer>
  );
};

export default ContactFooter;