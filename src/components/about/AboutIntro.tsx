'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Coffee, Sparkles } from 'lucide-react';

const facts = [
  { icon: <MapPin size={14} />, label: 'Based in', value: 'Kathmandu, Nepal' },
  { icon: <Coffee size={14} />, label: 'Fuel', value: 'Coffee & curiosity' },
  {
    icon: <Sparkles size={14} />,
    label: 'Currently',
    value: 'Open to opportunities',
  },
];

const AboutIntro: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="flex flex-col gap-8"
    >
      {/* Bio */}
      <div className="p-2 lg:p-8 bg-zinc-900/30 border border-white/5 rounded-2xl space-y-4 relative overflow-hidden group hover:border-sky-500/20 transition-all duration-500">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-sky-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <p className="text-zinc-300 text-base leading-relaxed">
          Hey! I&apos;m{' '}
          <span className="text-white font-semibold">Sunil Bhattarai</span>, a
          fullstack software developer who loves turning complex problems into
          clean, intuitive experiences. I care deeply about the code I write —
          not just that it works, but that it&apos;s maintainable, scalable, and
          a pleasure to read.
        </p>
        <p className="text-zinc-400 text-sm leading-relaxed">
          I started coding out of sheer curiosity, and that curiosity has never
          left. Whether it&apos;s architecting a backend system, polishing a UI
          interaction, or exploring a new framework on a weekend, I&apos;m
          always building something.
        </p>
      </div>

      {/* Quick facts */}
      <div className="flex flex-wrap lg:grid lg:grid-cols-3 gap-3">
        {facts.map((fact, i) => (
          <div
            key={i}
            className="flex flex-col gap-1.5 p-4 bg-zinc-950/50 border border-white/5 rounded-xl hover:border-sky-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-1.5 text-sky-500">
              {fact.icon}
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                {fact.label}
              </span>
            </div>
            <span className="text-sm font-semibold text-white">
              {fact.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AboutIntro;
