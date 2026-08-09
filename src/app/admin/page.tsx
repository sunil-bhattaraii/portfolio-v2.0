import Link from 'next/link';
import { fetchAdmin } from '@/lib/api';
import { Card } from '@/components/admin/ui';
import {
  Code2,
  FolderKanban,
  Briefcase,
  GraduationCap,
  Share2,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import type { Skill, Project, Qualification, Experience, Social, SiteConfigData } from '@/types';

export const dynamic = 'force-dynamic';

const STATS = [
  { label: 'Skills', path: '/admin/skills', icon: Code2 },
  { label: 'Projects', path: '/admin/projects', icon: FolderKanban },
  { label: 'Experience', path: '/admin/experience', icon: Briefcase },
  { label: 'Qualifications', path: '/admin/qualifications', icon: GraduationCap },
  { label: 'Socials', path: '/admin/socials', icon: Share2 },
] as const;

export default async function AdminDashboard() {
  const [skills, projects, qualifications, experience, socials, config, allowlist] =
    await Promise.all([
      fetchAdmin<Skill[]>('/api/skills'),
      fetchAdmin<Project[]>('/api/projects'),
      fetchAdmin<Qualification[]>('/api/qualifications'),
      fetchAdmin<Experience[]>('/api/experience'),
      fetchAdmin<Social[]>('/api/socials'),
      fetchAdmin<SiteConfigData>('/api/site-config'),
      fetchAdmin<{ email: string }[]>('/api/allowlist'),
    ]);

  const counts = {
    skills: skills?.length ?? 0,
    projects: projects?.length ?? 0,
    experience: experience?.length ?? 0,
    qualifications: qualifications?.length ?? 0,
    socials: socials?.length ?? 0,
  };

  const name = config?.hero?.name || 'Not set';
  const email = config?.contact?.email || 'Not set';
  const allowlistCount = allowlist?.length ?? 0;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
        Dashboard
      </h1>
      <p className="text-sm text-zinc-500 font-medium mb-8">
        Manage every piece of content on the site.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.path} href={stat.path} className="block">
              <Card className="p-5 hover:border-sky-500/30 hover:bg-zinc-900/60 transition-all h-full group">
                <div className="flex items-center justify-between mb-4">
                  <Icon size={18} className="text-sky-500" />
                  <span className="text-3xl font-black text-white tracking-tighter">
                    {counts[stat.label.toLowerCase() as keyof typeof counts]}
                  </span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400">
                  {stat.label}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings size={16} className="text-sky-500" />
            <h2 className="text-sm font-black text-white uppercase tracking-widest">
              Site Config
            </h2>
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Name</dt>
              <dd className="text-white font-bold truncate">{name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Contact email</dt>
              <dd className="text-white font-bold truncate">{email}</dd>
            </div>
          </dl>
          <Link
            href="/admin/site-config"
            className="inline-block mt-4 text-xs font-bold text-sky-500 hover:text-sky-400"
          >
            Edit site config →
          </Link>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={16} className="text-sky-500" />
            <h2 className="text-sm font-black text-white uppercase tracking-widest">
              Allowlist
            </h2>
          </div>
          <p className="text-sm text-zinc-500 mb-4">
            Only these GitHub emails can sign in to this panel.
          </p>
          <p className="text-3xl font-black text-white tracking-tighter mb-1">
            {allowlistCount}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            allowed email(s)
          </p>
          <Link
            href="/admin/allowlist"
            className="inline-block mt-4 text-xs font-bold text-sky-500 hover:text-sky-400"
          >
            Manage allowlist →
          </Link>
        </Card>
      </div>
    </div>
  );
}
