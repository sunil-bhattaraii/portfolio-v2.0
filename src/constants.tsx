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
import { Skill, Qualification, Project, Experience } from './types';

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

export const INITIAL_SKILLS: Skill[] = [
  // Core Skills
  {
    id: '1',
    name: 'System Architecture',
    level: 'Experienced',
    icon: 'Layers',
    highlight: true,
    categories: ['Core', 'Backend'],
  },
  {
    id: '2',
    name: 'React / Next.js',
    level: 'Experienced',
    icon: 'Code2',
    highlight: true,
    categories: ['Core', 'Frontend'],
  },
  {
    id: '3',
    name: 'Node.js Backend',
    level: 'Intermediate',
    icon: 'Terminal',
    highlight: true,
    categories: ['Core', 'Backend'],
  },
  {
    id: '4',
    name: 'Database Design',
    level: 'Intermediate',
    icon: 'Database',
    highlight: true,
    categories: ['Core', 'Backend'],
  },
  {
    id: '5',
    name: 'UI/UX Design',
    level: 'Beginner',
    icon: 'Layout',
    highlight: true,
    categories: ['Core', 'Design'],
  },
  {
    id: '6',
    name: 'TypeScript',
    level: 'Experienced',
    icon: 'Cpu',
    highlight: true,
    categories: ['Core', 'Frontend'],
  },

  // Secondary Skills
  {
    id: '7',
    name: 'Git & Versioning',
    level: 'Experienced',
    icon: 'GitBranch',
    highlight: false,
    categories: ['DevOps'],
  },
  {
    id: '8',
    name: 'Cloud (AWS/GCP)',
    level: 'Intermediate',
    icon: 'Cloud',
    highlight: false,
    categories: ['DevOps'],
  },
  {
    id: '9',
    name: 'Cyber Security',
    level: 'Beginner',
    icon: 'Shield',
    highlight: false,
    categories: ['DevOps'],
  },
  {
    id: '10',
    name: 'Mobile Dev',
    level: 'Intermediate',
    icon: 'Smartphone',
    highlight: false,
    categories: ['Frontend'],
  },
  {
    id: '11',
    name: 'CI/CD Pipelines',
    level: 'Intermediate',
    icon: 'Workflow',
    highlight: false,
    categories: ['DevOps'],
  },
  {
    id: '12',
    name: 'GraphQL APIs',
    level: 'Experienced',
    icon: 'Globe',
    highlight: false,
    categories: ['Backend'],
  },
];

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: '1',
    role: 'Senior Software Engineer',
    company: 'TechFlow Solutions',
    duration: 'Jan 2023 - Present',
    description: [
      'Led the transition from monolithic architecture to a microservices-based system.',
      'Optimized database queries resulting in a 40% reduction in response latency.',
      'Mentored a team of 5 junior developers in modern React patterns.',
    ],
    skills: ['Next.js', 'Go', 'Kubernetes', 'PostgreSQL'],
  },
  {
    id: '2',
    role: 'Full Stack Developer',
    company: 'Nexus Creative Agency',
    duration: 'June 2021 - Dec 2022',
    description: [
      'Developed custom e-commerce solutions for high-traffic luxury brands.',
      'Implemented robust CI/CD pipelines using GitHub Actions.',
      'Crafted pixel-perfect UIs with a focus on accessibility and performance.',
    ],
    skills: ['React', 'Node.js', 'AWS', 'Tailwind CSS'],
  },
  {
    id: '3',
    role: 'Junior Developer',
    company: 'Startup Hub',
    duration: 'Jan 2020 - May 2021',
    description: [
      'Contributed to the development of a real-time messaging platform.',
      'Integrated third-party APIs for payment processing and analytics.',
      'Maintained high code quality through rigorous unit testing and peer reviews.',
    ],
    skills: ['JavaScript', 'Socket.io', 'MongoDB', 'Express'],
  },
];

export const INITIAL_QUALIFICATIONS: Qualification[] = [
  {
    id: '1',
    title: 'Bachelor of Software Engineering',
    institute: 'Technical University of Nepal',
    year: '2022',
    details: 'Graduated with Honors, Specialization in Distributed Systems.',
    type: 'degree',
  },
  {
    id: '2',
    title: 'Professional System Design Certificate',
    institute: 'Global Academy of Tech',
    year: '2023',
    details: 'Advanced architecture patterns and cloud scalability.',
    type: 'certification',
  },
  {
    id: '3',
    title: 'Frontend Development Specialization',
    institute: 'Code Masters Institute',
    year: '2021',
    details: 'Mastery of modern JavaScript frameworks.',
    type: 'certification',
  },
  {
    id: '4',
    title: 'AWS Certified Solutions Architect',
    institute: 'Amazon Web Services',
    year: '2023',
    details:
      'Design and deployment of scalable, highly available systems on AWS.',
    type: 'certification',
  },
  {
    id: '5',
    title: 'Deep Learning Specialization',
    institute: 'DeepLearning.AI',
    year: '2022',
    details: 'Neural networks, computer vision, and NLP fundamentals.',
    type: 'certification',
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Enterprise ERP System',
    description:
      'A robust enterprise resource planning platform designed for high-scale retail operations.',
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind'],
    imageUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    status: 'Completed',
    fullDetails:
      'This project involved building a comprehensive ERP system that handles inventory, sales, and employee management for a mid-sized retail chain. It features real-time data visualization and automated reporting.',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: '2',
    title: 'Distributed Analytics Engine',
    description:
      'High-performance analytics engine capable of processing millions of events per second.',
    techStack: ['Node.js', 'Redis', 'Kafka', 'Go'],
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bbda38a5f85d?q=80&w=1000&auto=format&fit=crop',
    status: 'Ongoing',
    fullDetails:
      'Currently developing a low-latency analytics pipeline that aggregates user behavior data for real-time dashboarding. Focus is on horizontal scalability and fault tolerance.',
    githubUrl: 'https://github.com',
  },
  {
    id: '3',
    title: 'AI-Powered Code Assistant',
    description:
      'IDE plugin that suggests architectural improvements based on best practices.',
    techStack: ['TypeScript', 'Gemini API', 'VS Code API'],
    imageUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    status: 'Completed',
    fullDetails:
      'An extension for VS Code that analyzes the active codebase to suggest refactoring patterns and architectural optimizations using large language models.',
    liveUrl: 'https://example.com',
  },
  {
    id: '4',
    title: 'AI-Powered Code Assistant',
    description:
      'IDE plugin that suggests architectural improvements based on best practices.',
    techStack: ['TypeScript', 'Gemini API', 'VS Code API'],
    imageUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    status: 'Completed',
    fullDetails:
      'An extension for VS Code that analyzes the active codebase to suggest refactoring patterns and architectural optimizations using large language models.',
    liveUrl: 'https://example.com',
  },
  {
    id: '5',
    title: 'AI-Powered Code Assistant',
    description:
      'IDE plugin that suggests architectural improvements based on best practices.',
    techStack: ['TypeScript', 'Gemini API', 'VS Code API'],
    imageUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    status: 'Completed',
    fullDetails:
      'An extension for VS Code that analyzes the active codebase to suggest refactoring patterns and architectural optimizations using large language models.',
    liveUrl: 'https://example.com',
  },
  {
    id: '6',
    title: 'AI-Powered Code Assistant',
    description:
      'IDE plugin that suggests architectural improvements based on best practices.',
    techStack: ['TypeScript', 'Gemini API', 'VS Code API'],
    imageUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    status: 'Completed',
    fullDetails:
      'An extension for VS Code that analyzes the active codebase to suggest refactoring patterns and architectural optimizations using large language models.',
    liveUrl: 'https://example.com',
  },
];

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
