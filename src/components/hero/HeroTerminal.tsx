"use client";

import React from 'react';

const HeroTerminal: React.FC = () => {
  return (
    <div className="glass rounded-xl overflow-hidden mb-6 shadow-2xl border border-white/5 font-mono text-[10px] md:text-sm leading-relaxed max-w-lg mx-auto lg:mx-0 hidden lg:block">
      <div className="bg-white/5 px-3 md:px-4 py-1.5 md:py-2 border-b border-white/5 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
        </div>
        <div className="text-[9px] md:text-[10px] text-zinc-500 font-medium">main.ts</div>
      </div>
      <div className="p-4 md:p-8 overflow-x-auto whitespace-pre text-left">
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none text-right w-3 text-[10px]">1</span>
          <span><span className="code-comment">// Dev Log - Linus</span></span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none text-right w-3 text-[10px]">2</span>
          <span><span className="code-keyword">function</span> <span className="code-func">build</span>() &#123;</span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none text-right w-3 text-[10px]">3</span>
          <span>  <span className="code-keyword">return</span> <span className="code-func">craft</span>(<span className="code-const">Systems</span>).<span className="code-func">with</span>(<span className="code-const">Design</span>).<span className="code-func">optimize</span>(<span className="code-const">UX</span>);</span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none text-right w-3 text-[10px]">4</span>
          <span>&#125;</span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none text-right w-3 text-[10px]">5</span>
          <span></span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none text-right w-3 text-[10px]">6</span>
          <span><span className="code-comment">// Profile</span></span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none text-right w-3 text-[10px]">7</span>
          <span><span className="code-keyword">const</span> <span className="code-const">me</span> = &#123;</span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none text-right w-3 text-[10px]">8</span>
          <span>  <span className="code-prop">name</span>: <span className="code-string">"Sunil"</span>,</span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none text-right w-3 text-[10px]">9</span>
          <span>  <span className="code-prop">role</span>: <span className="code-string">"Developer"</span>,</span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none text-right w-3 text-[10px]">10</span>
          <span>  <span className="code-prop">location</span>: <span className="code-string">"Kathmandu"</span></span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none text-right w-3 text-[10px]">11</span>
          <span>&#125;;</span>
        </div>
      </div>
    </div>
  );
};

export default HeroTerminal;