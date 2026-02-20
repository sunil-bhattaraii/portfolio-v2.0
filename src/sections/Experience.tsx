import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { INITIAL_EXPERIENCES } from '../constants';
import { Section } from '../types';
import ExperienceHeader from '../components/experience/ExperienceHeader';
import ExperienceCard from '../components/experience/ExperienceCard';

const Experience: React.FC = () => {
  return (
    <SectionWrapper
      id={Section.Experience}
      className="relative"
      scrollTargetId={Section.Qualifications}
    >
      <ExperienceHeader />
      <div className="space-y-12">
        {INITIAL_EXPERIENCES.length === 0 ? (
          <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase">
            New experiences coming soon
          </p>
        ) : (
          INITIAL_EXPERIENCES.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))
        )}
      </div>
    </SectionWrapper>
  );
};

export default Experience;
