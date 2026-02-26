'use client';

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleMouseEnter = () => {
    setIframeLoaded(false);
    setHovered(true);
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-pointer overflow-hidden bg-zinc-900/50 border border-white/5 transition-all hover:bg-zinc-900"
    >
      <div className="aspect-video w-full overflow-hidden saturate-[0.4] brightness-90 opacity-75 group-hover:saturate-100 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-700 relative">
        {/* Always render the image as base layer */}
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Loading shimmer shown while iframe is loading */}
        {hovered && project.liveUrl && !iframeLoaded && (
          <div className="absolute inset-0 bg-zinc-900/80 flex items-center justify-center">
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" />
            </div>
          </div>
        )}

        {/* Iframe rendered on hover, fades in once loaded */}
        {hovered && project.liveUrl && (
          <>
            <iframe
              src={project.liveUrl}
              title={project.title}
              className={`absolute inset-0 w-full h-full border-0 scale-105 transition-opacity duration-500 origin-top-left ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ pointerEvents: 'none' }}
              sandbox="allow-scripts allow-same-origin"
              onLoad={() => setIframeLoaded(true)}
            />
            <div className="absolute inset-0" />
          </>
        )}
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
