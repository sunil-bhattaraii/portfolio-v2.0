import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Section } from '../types';
import SkillsHeader from '../components/skills/SkillsHeader';
import SkillsGrid from '../components/skills/SkillsGrid';

const Skills: React.FC = () => {
  return (
    <SectionWrapper id={Section.Skills} className="relative" scrollTargetId={Section.Experience}>
      <SkillsHeader />
      <SkillsGrid />
    </SectionWrapper>
  );
};

export default Skills;