import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Section } from '../types';
import HeroTitle from '../components/hero/HeroTitle';
import HeroTerminal from '../components/hero/HeroTerminal';
import SocialLinks from '../components/hero/SocialLinks';
import HeroActions from '../components/hero/HeroActions';
import HeroImage from '../components/hero/HeroImage';

const Hero: React.FC = () => {
  return (
    <SectionWrapper 
      id={Section.Hero} 
      className="relative !pt-12 lg:!pt-32 max-h-screen lg:max-h-none overflow-hidden lg:overflow-visible" 
      scrollTargetId={Section.Skills}
      showIndicatorOnMobile={true}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full gap-8 lg:gap-24 h-full">
        <div className="order-2 lg:order-1 w-full lg:max-w-2xl xl:max-w-3xl">
          <HeroTitle />
          <HeroTerminal />
          <SocialLinks />
          <HeroActions />
        </div>

        <HeroImage />
      </div>
    </SectionWrapper>
  );
};

export default Hero;