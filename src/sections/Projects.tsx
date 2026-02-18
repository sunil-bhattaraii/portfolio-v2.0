import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Section } from '../types';
import ProjectsHeader from '../components/projects/ProjectsHeader';
import ProjectsGrid from '../components/projects/ProjectsGrid';

const Projects: React.FC = () => {
  return (
    <SectionWrapper 
      id={Section.Projects} 
      className="relative" 
      scrollTargetId={Section.Contact}
    >
      <ProjectsHeader />
      <ProjectsGrid />
    </SectionWrapper>
  );
};

export default Projects;