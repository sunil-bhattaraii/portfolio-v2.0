'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden bg-zinc-900/50 border border-white/5 transition-all hover:bg-zinc-900"
    >
      <div className="aspect-[16/10] w-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-10 border-t border-white/5">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-wrap gap-4">
            {project.techStack.slice(0, 2).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest"
              >
                {tech}
              </span>
            ))}
          </div>
          <ArrowUpRight
            size={18}
            className="text-zinc-600 group-hover:text-sky-500 transition-colors"
          />
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight mb-2">
          {project.title}
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed font-medium line-clamp-2">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
