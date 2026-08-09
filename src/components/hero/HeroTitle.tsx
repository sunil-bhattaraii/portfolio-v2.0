import React from 'react';

interface HeroTitleProps {
  name: string;
  role: string;
}

const HeroTitle: React.FC<HeroTitleProps> = ({ name, role }) => {
  return (
    <div className="text-center lg:text-left animate-fade-left">
      <h1 className="text-4xl sm:text-5xl lg:text-8xl font-black text-white mb-1 tracking-tighter leading-[0.85] select-none">
        {name || 'Your Name'}
      </h1>

      <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 md:mb-10 ml-1">
        <span className="w-8 md:w-10 h-px bg-sky-500 hidden lg:block"></span>
        <span className="text-[10px] md:text-[11px] font-bold text-sky-500 uppercase tracking-[0.3em]">
          {role || 'Your Role'}
        </span>
      </div>
    </div>
  );
};

export default HeroTitle;
