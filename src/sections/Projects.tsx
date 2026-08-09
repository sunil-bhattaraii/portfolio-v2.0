import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Section } from '../types';
import ProjectsHeader from '../components/projects/ProjectsHeader';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import { getProjects } from '@/lib/queries';

const Projects: React.FC = async () => {
  const projects = await getProjects();

  return (
    <SectionWrapper 
      id={Section.Projects} 
      className="relative" 
      scrollTargetId={Section.Contact}
    >
      <ProjectsHeader />
      <ProjectsGrid projects={projects} />
    </SectionWrapper>
  );
};

export default Projects;
