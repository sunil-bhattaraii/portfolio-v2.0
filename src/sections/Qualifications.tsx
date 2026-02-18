import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Section } from '../types';
import QualificationsSideInfo from '../components/qualifications/QualificationsSideInfo';
import QualificationsList from '../components/qualifications/QualificationsList';

const Qualifications: React.FC = () => {
  return (
    <SectionWrapper id={Section.Qualifications} className="relative" scrollTargetId={Section.Projects}>
      <div className="flex flex-col lg:flex-row gap-20">
        <QualificationsSideInfo />
        <QualificationsList />
      </div>
    </SectionWrapper>
  );
};

export default Qualifications;