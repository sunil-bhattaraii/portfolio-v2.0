import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Github, Globe, EyeOff } from 'lucide-react';
import { getProjectById } from '@/lib/queries';
import MarkdownContent from '@/components/MarkdownContent';

export const dynamic = 'force-dynamic';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

const ProjectPage: React.FC<ProjectPageProps> = async ({ params }) => {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  const showPreview = project.showPreview !== false;
  const body = project.fullDetails?.trim() || project.description || '';

  return (
    <main className="min-h-screen">
      {/* Wide cover — fixed height, excess cropped */}
      <div className="relative w-full h-[55vh] md:h-[62vh] overflow-hidden bg-zinc-900">
        {showPreview && project.liveUrl ? (
          <iframe
            src={project.liveUrl}
            title={`${project.title} — live preview`}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        ) : project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
            <EyeOff size={32} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 -mt-20 relative">
        <div className="p-6 md:p-8 bg-zinc-900/60 border border-white/10 rounded-2xl backdrop-blur-md">
          {/* Meta */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
              >
                {tech}
              </span>
            ))}
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                project.status === 'Ongoing'
                  ? 'bg-sky-500/15 text-sky-400'
                  : 'bg-emerald-500/15 text-emerald-400'
              }`}
            >
              {project.status}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6">
            {project.title}
          </h1>

          {/* Links */}
          <div className="flex flex-wrap gap-3 mb-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg transition-colors"
              >
                <Globe size={14} />
                Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white text-xs font-bold rounded-lg transition-colors"
              >
                <Github size={14} />
                Repository
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="p-6 md:p-8 bg-zinc-900/30 border border-white/5 rounded-2xl mt-6">
          <h2 className="text-xs font-black text-white uppercase tracking-widest text-sky-500 mb-4">
            Project Details
          </h2>
          <MarkdownContent content={body} />
        </div>

        <div className="mt-10 pb-16">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
