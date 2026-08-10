'use client';

import React from 'react';
import { getLucideIcon } from '../../lib/icon-registry';
import MarkdownContent from '../MarkdownContent';

interface Fact {
  icon: string;
  label: string;
  value: string;
}

interface AboutIntroProps {
  intro: string[];
  facts: Fact[];
}

const AboutIntro: React.FC<AboutIntroProps> = ({ intro, facts }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Bio */}
      {intro.length > 0 && (
        <div className="p-2 lg:p-8 bg-zinc-900/30 border border-white/5 rounded-2xl space-y-4 relative overflow-hidden group hover:border-sky-500/20 transition-all duration-500">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-sky-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          {intro.map((paragraph, i) => (
            <div key={i}>
              <MarkdownContent content={paragraph} className="space-y-0" />
            </div>
          ))}
        </div>
      )}

      {/* Quick facts */}
      {facts.length > 0 && (
        <div className="flex flex-wrap lg:grid lg:grid-cols-3 gap-3">
          {facts.map((fact, i) => {
            const Icon = getLucideIcon(fact.icon);
            return (
              <div
                key={i}
                className="flex flex-col gap-1.5 p-4 bg-zinc-950/50 border border-white/5 rounded-xl hover:border-sky-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-1.5 text-sky-500">
                  <Icon size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    {fact.label}
                  </span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {fact.value}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AboutIntro;
