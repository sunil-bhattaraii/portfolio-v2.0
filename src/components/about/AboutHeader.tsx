import React from 'react';

const AboutHeader: React.FC = () => {
  return (
    <div className="mb-16 text-center md:text-left animate-fade-left">
      <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
        <span className="w-8 h-px bg-sky-500" />
        <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.2em]">
          Get to know me
        </span>
      </div>
      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
        About Me
      </h2>
    </div>
  );
};

export default AboutHeader;
