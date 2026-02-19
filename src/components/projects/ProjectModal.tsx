'use client';

import React from 'react';
import { X, Github, ExternalLink } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-zinc-950 border border-white/10 overflow-hidden relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white z-10 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-square md:aspect-auto h-full">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-10 md:p-16 flex flex-col justify-center">
            <h2 className="text-4xl font-black text-white mb-6 tracking-tighter leading-tight">
              {project.title}
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              {project.fullDetails || project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white/5 border border-white/5 text-[10px] font-bold text-sky-500 uppercase tracking-widest"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-zinc-400 hover:text-white border border-white/5 transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github size={20} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-sky-600 text-white font-bold flex items-center gap-2 hover:bg-sky-500 transition-colors"
                >
                  Live Preview <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
