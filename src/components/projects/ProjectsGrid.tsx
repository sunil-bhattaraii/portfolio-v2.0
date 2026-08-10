'use client';

import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import type { Project } from '../../types';
import {
  closeProjectModal,
  OPEN_PROJECT_MODAL_EVENT,
  CLOSE_PROJECT_MODAL_EVENT,
} from '@/lib/project-modal';

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const project = (event as CustomEvent<Project>).detail;
      if (project) setSelectedProject(project);
    };
    const onClose = () => setSelectedProject(null);
    window.addEventListener(OPEN_PROJECT_MODAL_EVENT, onOpen);
    window.addEventListener(CLOSE_PROJECT_MODAL_EVENT, onClose);
    return () => {
      window.removeEventListener(OPEN_PROJECT_MODAL_EVENT, onOpen);
      window.removeEventListener(CLOSE_PROJECT_MODAL_EVENT, onClose);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-0">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeProjectModal}
        />
      )}
    </>
  );
};

export default ProjectsGrid;
