'use client';

import React, { useEffect } from 'react';
import { X, Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { Project } from '../../types';
import Image from 'next/image';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center p-0 md:p-8 bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full h-full md:h-auto md:max-w-4xl bg-zinc-950 border-0 md:border border-white/10 overflow-hidden relative shadow-2xl md:max-h-[90vh] overflow-y-auto flex flex-col md:block"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile-only top bar with back button */}
        <div className="flex md:hidden items-center px-4 py-3 border-b border-white/5">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Back to projects"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-semibold tracking-wide">
              Projects
            </span>
          </button>
        </div>

        {/* Desktop-only absolute close button */}
        <button
          onClick={onClose}
          className="hidden md:block absolute top-6 right-6 p-2 text-zinc-500 hover:text-white z-10 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 flex-1 md:flex-none">
          <div className="h-[55vw] md:h-auto md:aspect-auto md:min-h-100 relative overflow-hidden">
            {project.liveUrl ? (
              <iframe
                src={project.liveUrl}
                title={project.title}
                width={1920}
                height={1080}
                className="w-full h-full border-0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            ) : (
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="px-6 pt-4 pb-6 md:p-16 flex flex-col justify-start md:justify-center gap-1">
            <div className="flex gap-2 mb-1 md:mb-6 overflow-x-auto no-scrollbar">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="shrink-0 px-2 py-0.5 bg-white/5 border border-white/5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest"
                >
                  {tech}
                </span>
              ))}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-1 md:mb-6 tracking-tighter leading-tight">
              {project.title}
            </h2>
            <div className="flex gap-4 mb-4 md:mb-6 justify-between">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sky-500 hover:text-sky-400 font-bold text-sm transition-colors"
                >
                  {project.liveUrl.replace(/^https?:\/\//, '')}{' '}
                  <ExternalLink size={14} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-white font-bold text-sm transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github size={15} />
                </a>
              )}
            </div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-2">
              Project Details
            </h3>
            <p className="text-zinc-400 whitespace-pre-wrap font-sans text-sm md:text-lg mb-6 md:mb-8 leading-snug md:max-h-[40vh] md:overflow-auto">
              {project.fullDetails || project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
