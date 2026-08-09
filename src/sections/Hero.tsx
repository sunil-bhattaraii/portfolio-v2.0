import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Section } from '../types';
import HeroTitle from '../components/hero/HeroTitle';
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
      <div className="flex flex-col lg:flex-row items-center justify-center  w-full gap-6 md:gap-8 lg:gap-48 h-full">
        <div className="order-2 lg:order-1">
          <HeroTitle />
          <SocialLinks />
          <HeroActions />
        </div>

        <HeroImage />
      </div>
    </SectionWrapper>
  );
};

export default Hero;
