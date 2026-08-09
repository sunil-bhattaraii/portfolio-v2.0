'use client';

import React from 'react';
import type { Social } from '../types';
import { getSocialIcon, getSocialHoverColor } from '../lib/icon-registry';

type Variant = 'hero' | 'contact';

export interface SocialLinksProps {
  socials: Social[];
  variant?: Variant;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ socials, variant = 'hero' }) => {
  const iconSize = variant === 'contact' ? 20 : 18;

  if (variant === 'contact') {
    return (
      <div className="mt-12 flex flex-wrap gap-4">
        {socials.map((social) => (
          <a
            key={social.id ?? social.platform}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 bg-zinc-900 border border-white/5 rounded-lg text-zinc-500 ${getSocialHoverColor(social.platform)} transition-colors`}
            aria-label={social.label || social.platform}
          >
            {getSocialIcon(social.platform, iconSize)}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-4 mb-8 md:mb-10 animate-fade-left [animation-delay:240ms]">
      {socials.map((social) => (
        <a
          key={social.id ?? social.platform}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 md:w-10 md:h-10 rounded-lg border border-white/5 bg-zinc-900/50 flex items-center justify-center text-zinc-500 hover:text-sky-500 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-300 group shadow-lg"
          aria-label={social.label || social.platform}
        >
          <span className="group-hover:scale-110 transition-transform">
            {getSocialIcon(social.platform, iconSize)}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
