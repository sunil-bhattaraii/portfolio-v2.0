import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Section } from '../types';
import QualificationsSideInfo from '../components/qualifications/QualificationsSideInfo';
import QualificationsList from '../components/qualifications/QualificationsList';
import { getQualifications } from '@/lib/queries';

const Qualifications: React.FC = async () => {
  const qualifications = await getQualifications();

  return (
    <SectionWrapper id={Section.Qualifications} className="relative" scrollTargetId={Section.Projects}>
      <div className="flex flex-col lg:flex-row gap-20">
        <QualificationsSideInfo />
        <QualificationsList qualifications={qualifications} />
      </div>
    </SectionWrapper>
  );
};

export default Qualifications;
