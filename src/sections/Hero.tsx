import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Section } from '../types';
import HeroTitle from '../components/hero/HeroTitle';
import HeroTerminal from '../components/hero/HeroTerminal';
import SocialLinks from '../components/SocialLinks';
import HeroActions from '../components/hero/HeroActions';
import HeroImage from '../components/hero/HeroImage';

const Hero: React.FC = () => {
  return (
    <SectionWrapper
      id={Section.Hero}
      className="h-screen relative pt-12! lg:pt-32! max-h-screen lg:max-h-none overflow-hidden lg:overflow-visible"
      scrollTargetId={Section.Skills}
      showIndicatorOnMobile={true}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full gap-6 md:gap-8 lg:gap-24 h-full">
        <div className="order-2 lg:order-1 w-full lg:max-w-2xl xl:max-w-3xl">
          <div className="lg:hidden flex justify-center mb-4">
            <span className="px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-[10px] uppercase tracking-[0.24em] font-semibold text-sky-300">
              open to internships
            </span>
          </div>

          <HeroTitle />
          <HeroTerminal />

          <div className="lg:hidden mb-4 rounded-2xl border border-white/10 bg-zinc-900/40 p-4">
            <p className="text-zinc-300 text-sm leading-relaxed">
              Computer Science student focused on building useful digital
              products with clean UX and reliable engineering.
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 text-[10px] uppercase tracking-[0.18em]">
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-zinc-400">
                Analytical
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-zinc-400">
                Curious
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-zinc-400">
                Strategic
              </span>
            </div>
          </div>

          <div className="lg:hidden rounded-2xl border border-white/10 bg-zinc-900/30 px-4 pt-4 pb-5">
            <SocialLinks />
            <HeroActions />
          </div>

          <div className="hidden lg:block">
            <SocialLinks />
            <HeroActions />
          </div>
        </div>

        <HeroImage />
      </div>
    </SectionWrapper>
  );
};

export default Hero;
