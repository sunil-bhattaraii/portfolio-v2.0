"use client";

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { INITIAL_PROJECTS } from '../../constants';
import { Project } from '../../types';

const ProjectsGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {INITIAL_PROJECTS.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={() => setSelectedProject(project)} 
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsGrid;