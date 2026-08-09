import React from 'react';
import {
  Code2,
  Layers,
  Database,
  Globe,
  Layout,
  Cpu,
  Monitor,
  Terminal,
  GitBranch,
  Cloud,
  Shield,
  Smartphone,
  Workflow,
} from 'lucide-react';

export const COLORS = {
  bgCard: 'rgba(24, 24, 27, 0.8)',
  surfaceHover: 'rgba(39, 39, 42, 0.8)',
  textPrimary: '#f4f4f5',
  textSecondary: '#a1a1aa',
  textMuted: '#52525b',
  accent: '#0ea5e9', // Sky
  accentHover: '#0284c7',
  border: 'rgba(255, 255, 255, 0.05)',
};

export const getIcon = (name: string) => {
  const icons: Record<string, React.ReactNode> = {
    Layers: <Layers size={20} />,
    Code2: <Code2 size={20} />,
    Terminal: <Terminal size={20} />,
    Database: <Database size={20} />,
    Layout: <Layout size={20} />,
    Cpu: <Cpu size={20} />,
    Monitor: <Monitor size={20} />,
    Globe: <Globe size={20} />,
    GitBranch: <GitBranch size={20} />,
    Cloud: <Cloud size={20} />,
    Shield: <Shield size={20} />,
    Smartphone: <Smartphone size={20} />,
    Workflow: <Workflow size={20} />,
  };
  return icons[name] || <Monitor size={20} />;
};
