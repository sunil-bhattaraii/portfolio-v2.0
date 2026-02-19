'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { Qualification } from '../../types';

interface QualificationItemProps {
  q: Qualification;
  index: number;
}

const QualificationItem: React.FC<QualificationItemProps> = ({ q, index }) => (
  <div className="relative pl-12 pb-16 last:pb-0 group">
    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-zinc-800 border border-white/10 rounded-full group-hover:bg-sky-500 group-hover:border-sky-500 transition-all duration-300"></div>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
      <span className="text-[10px] font-bold text-sky-500/60 uppercase tracking-[0.2em] mono flex items-center gap-2">
        <Calendar size={12} /> {q.year}
      </span>
    </div>
    <h3 className="text-2xl font-black text-white group-hover:text-sky-400 transition-colors tracking-tight mb-2">
      {q.title}
    </h3>
    <p className="text-zinc-500 font-bold text-sm mb-6">{q.institute}</p>
    {q.details && (
      <div className="p-6 bg-zinc-900/30 border border-white/5 rounded-lg text-sm text-zinc-500 leading-relaxed mono">
        {q.details}
      </div>
    )}
  </div>
);

export default QualificationItem;
