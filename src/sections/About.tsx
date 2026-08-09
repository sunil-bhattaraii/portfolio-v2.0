import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Section } from '../types';
import AboutHeader from '../components/about/AboutHeader';
import AboutIntro from '../components/about/AboutIntro';
import AboutHobbies from '../components/about/AboutHobbies';
import { getSiteConfig } from '@/lib/queries';

const About: React.FC = async () => {
  const config = await getSiteConfig();

  const intro = config?.about?.intro ?? [];
  const facts = config?.about?.facts ?? [];
  const hobbies = config?.about?.hobbies ?? [];

  return (
    <SectionWrapper
      id={Section.About}
      className="relative"
      scrollTargetId={Section.Hero}
      scrollDirection="up"
    >
      <AboutHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <AboutIntro intro={intro} facts={facts} />
        <AboutHobbies hobbies={hobbies} />
      </div>
    </SectionWrapper>
  );
};

export default About;
