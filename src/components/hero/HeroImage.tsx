"use client";

import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FileText } from 'lucide-react';

const HeroImage: React.FC = () => {
  const [isMediaHovered, setIsMediaHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const textVariants = {
    initial: { width: 0, opacity: 0, marginLeft: 0, paddingRight: 0 },
    hover: { width: "auto", opacity: 1, marginLeft: 16, paddingRight: 16 }
  };

  return (
    <motion.div 
      className="order-1 lg:order-2 w-1/2 lg:w-full lg:max-w-xl xl:max-w-2xl flex justify-center lg:justify-end" 
      initial={{ opacity: 0, scale: 0.9, x: 50 }} 
      animate={{ opacity: 1, scale: 1, x: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div 
        className="relative w-full aspect-square group perspective-1000 max-w-[200px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-none" 
        onMouseMove={handleMouseMove} 
        onMouseEnter={() => setIsMediaHovered(true)}
        onMouseLeave={() => { 
          x.set(0); 
          y.set(0); 
          setIsMediaHovered(false);
        }}
      >
        <div className="absolute -inset-4 md:-inset-10 border border-white/5 rounded-[1.5rem] md:rounded-[3rem] pointer-events-none group-hover:border-sky-500/10 transition-colors duration-1000"></div>
        <div className="absolute -top-3 md:-top-6 -right-3 md:-right-6 w-12 md:w-32 h-12 md:h-32 border-t-2 border-r-2 border-sky-500/30 rounded-tr-[1.5rem] md:rounded-tr-[3rem] group-hover:border-sky-500 transition-all duration-500"></div>
        <div className="absolute -bottom-3 md:-bottom-4 -left-3 md:-left-6 w-12 md:w-32 h-12 md:h-32 border-b-2 border-l-2 border-sky-500/30 rounded-bl-[1.5rem] md:rounded-bl-[3rem] group-hover:border-sky-500 transition-all duration-500"></div>

        <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-full h-full">
          <div className="relative w-full h-full overflow-hidden rounded-[1rem] md:rounded-[2rem] border border-white/10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] group-hover:shadow-sky-500/10 transition-shadow duration-500" style={{ transform: 'translateZ(0)' }}>
            <img 
              src="https://scontent.fktm21-2.fna.fbcdn.net/v/t39.30808-6/591884593_1364556501885221_8184740371461930556_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=cMTwx-bPioAQ7kNvwF_xTPt&_nc_oc=AdlQ6_lgTR_App4hUKVkthFpr7YKAvyZGMRtMhNLudR3y3z9cM115IG0eN-iAjW8yLghmG9Y2AW5XoH31c4D2Q1B&_nc_zt=23&_nc_ht=scontent.fktm21-2.fna&_nc_gid=s_RMnwiebGtmF7hxPMkU7A&oh=00_AfvL1mZE3tYbaGd5FYqrYX0Mje2qb7E_mB8uOpxLtJdAYA&oe=69975ED1" 
              alt="Sunil Bhattarai" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 pointer-events-none"></div>
            <motion.div initial={{ top: "-50%" }} animate={{ top: "150%" }} transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 6 }} className="absolute left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-sky-500/15 to-transparent -skew-y-12 pointer-events-none z-10 hidden lg:block" />
          </div>

          <motion.a 
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            animate={isMediaHovered ? "hover" : "initial"}
            layout
            style={{ translateZ: "80px" }}
            className="absolute right-4 bottom-4 bg-zinc-950/20 backdrop-blur-2xl border border-white/10 p-1.5 rounded-xl shadow-2xl hidden sm:flex items-center group/card hover:border-sky-500/50 transition-all duration-300"
          >
            <div className="p-2 md:p-3 bg-emerald-500/10 rounded-lg md:rounded-xl text-emerald-500 group-hover/card:scale-110 transition-transform">
              <FileText size={18} className="md:w-6 md:h-6" />
            </div>
            <motion.div 
              variants={textVariants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden flex flex-col"
            >
              <span className="text-[8px] md:text-[10px] uppercase font-black text-zinc-500 tracking-widest whitespace-nowrap">Document</span>
              <span className="text-xs md:text-base font-bold text-white whitespace-nowrap group-hover/card:text-sky-400 transition-colors">View Resume</span>
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroImage;