import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Section } from '../types';
import SkillsHeader from '../components/skills/SkillsHeader';
import SkillsGrid from '../components/skills/SkillsGrid';
import { getSkills } from '@/lib/queries';

const Skills: React.FC = async () => {
  const skills = await getSkills();

  return (
    <SectionWrapper id={Section.Skills} className="relative" scrollTargetId={Section.Experience}>
      <SkillsHeader />
      <SkillsGrid skills={skills} />
    </SectionWrapper>
  );
};

export default Skills;
