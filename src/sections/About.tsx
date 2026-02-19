import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Section } from '../types';
import AboutHeader from '../components/about/AboutHeader';
import AboutIntro from '../components/about/AboutIntro';
import AboutHobbies from '../components/about/AboutHobbies';

const About: React.FC = () => {
  return (
    <SectionWrapper
      id={Section.About}
      className="relative"
      scrollTargetId={Section.Hero}
      scrollDirection="up"
    >
      <AboutHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <AboutIntro />
        <AboutHobbies />
      </div>
    </SectionWrapper>
  );
};

export default About;
