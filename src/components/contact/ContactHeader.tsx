"use client";

import React from 'react';

const ContactHeader: React.FC = () => {
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-8 h-[1px] bg-sky-500"></span>
        <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.2em]">Communication Channel</span>
      </div>
      <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none">
        Let's <br/> <span className="text-zinc-700">Connect.</span>
      </h2>
    </>
  );
};

export default ContactHeader;