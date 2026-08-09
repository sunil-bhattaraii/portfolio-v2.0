import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Section } from '../types';
import ExperienceHeader from '../components/experience/ExperienceHeader';
import ExperienceCard from '../components/experience/ExperienceCard';
import { getExperience } from '@/lib/queries';

const Experience: React.FC = async () => {
  const experiences = await getExperience();

  return (
    <SectionWrapper
      id={Section.Experience}
      className="relative"
      scrollTargetId={Section.Qualifications}
    >
      <ExperienceHeader />
      <div className="space-y-12">
        {experiences.length === 0 ? (
          <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase">
            New experiences coming soon
          </p>
        ) : (
          experiences.map((exp, index) => (
            <ExperienceCard key={exp.id ?? index} exp={exp} index={index} />
          ))
        )}
      </div>
    </SectionWrapper>
  );
};

export default Experience;
