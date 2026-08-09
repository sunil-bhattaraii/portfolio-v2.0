'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Code2,
  FolderKanban,
  Briefcase,
  GraduationCap,
  Share2,
  Settings,
  ShieldCheck,
  Bot,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/skills', label: 'Skills', icon: Code2 },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/qualifications', label: 'Qualifications', icon: GraduationCap },
  { href: '/admin/socials', label: 'Socials', icon: Share2 },
  { href: '/admin/site-config', label: 'Site Config', icon: Settings },
  { href: '/admin/ai-config', label: 'AI Persona', icon: Bot },
  { href: '/admin/allowlist', label: 'Allowlist', icon: ShieldCheck },
];

const AdminNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="border-b border-white/5 bg-zinc-950/60">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex gap-1.5 overflow-x-auto no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold tracking-wide transition-colors ${
                active
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon size={14} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default AdminNav;
