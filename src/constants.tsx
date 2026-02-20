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
    name: 'MERN Stack Development',
    level: 'Experienced',
    icon: 'Layers',
    highlight: true,
    categories: ['Core', 'Fullstack'],
  },
  {
    id: '2',
    name: 'React / Next.js',
    level: 'Intermediate',
    icon: 'Code2',
    highlight: true,
    categories: ['Core', 'Frontend'],
  },
  {
    id: '3',
    name: 'Node.js / Express Backend',
    level: 'Intermediate',
    icon: 'Terminal',
    highlight: true,
    categories: ['Core', 'Backend'],
  },
  {
    id: '4',
    name: 'Database Design & SQL',
    level: 'Intermediate',
    icon: 'Database',
    highlight: true,
    categories: ['Core', 'Backend'],
  },
  {
    id: '5',
    name: 'Systems & OS Fundamentals',
    level: 'Intermediate',
    icon: 'Cpu',
    highlight: true,
    categories: ['Core', 'Systems'],
  },
  {
    id: '6',
    name: 'Data Structures & Algorithms',
    level: 'Intermediate',
    icon: 'Binary',
    highlight: true,
    categories: ['Core'],
  },

  // Secondary Skills
  {
    id: '7',
    name: 'C / C++ Programming',
    level: 'Intermediate',
    icon: 'Code',
    highlight: false,
    categories: ['Systems'],
  },
  {
    id: '8',
    name: 'MongoDB (NoSQL)',
    level: 'Intermediate',
    icon: 'Database',
    highlight: false,
    categories: ['Backend'],
  },
  {
    id: '9',
    name: 'Authentication (JWT, Sessions)',
    level: 'Intermediate',
    icon: 'Shield',
    highlight: false,
    categories: ['Backend'],
  },
  {
    id: '10',
    name: 'Git & Linux (Ubuntu)',
    level: 'Experienced',
    icon: 'GitBranch',
    highlight: false,
    categories: ['DevOps', 'Systems'],
  },
  {
    id: '11',
    name: 'REST API Design',
    level: 'Intermediate',
    icon: 'Globe',
    highlight: false,
    categories: ['Backend'],
  },
  {
    id: '12',
    name: 'Mathematics for Computing',
    level: 'Experienced',
    icon: 'FunctionSquare',
    highlight: false,
    categories: ['Core'],
  },
];

export const INITIAL_EXPERIENCES: Experience[] = [];

export const INITIAL_QUALIFICATIONS: Qualification[] = [
  {
    id: '1',
    title:
      'Bachelor of Science in Computer Science and Information Technology (BSc CSIT)',
    institute: 'Tribhuvan University (TU)',
    year: '2025 - Ongoing',
    details:
      'Focused on systems, databases, software engineering, and theoretical computer science.',
    type: 'degree',
  },
  {
    id: '2',
    title: '+2 Science',
    institute: 'Sunsari Crystal Academy',
    year: '2022 - 2024',
    details:
      'Higher secondary education under Nepal Education Board (NEB) with science stream.',
    type: 'degree',
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Hamro Menchhayayem',
    description:
      'A simple project to showcase my hometown Menchhayayem Rural Municipality to the digital world in collaboration with my friend.',
    techStack: ['Next.js', 'MongoDB', 'Vercel', 'Tailwind'],
    imageUrl:
      'https://res.cloudinary.com/dggnne5ja/image/upload/v1771578032/Screenshot_from_2026-02-20_14-43-49_ygbnbp.png',
    status: 'Completed',
    fullDetails: `This is a project focused on promoting the tourism, cultural identity, and literature of Menchhayayem Rural Municipality

The idea behind this project was simple: to digitally preserve local stories, places, and traditions, and make them easier for more people to discover while staying true to our roots.

This is our first proper full-stack project, where we went through the whole journey; From system analysis and planning, to UI design, and finally development. Learned a lot along the way, especially by building things from scratch and solving real problems.

Project details:
Tech stack: Next.js, React, Tailwind CSS, JavaScript
Developer team: Kushal Dhakal & Sunil Bhattarai
Mentors: Saroj Dhakal & ChatGPT
Reviewer: @Copilot

figma: https://lnkd.in/gBwSCHWG
github: https://lnkd.in/gnanW_ae
website: https://lnkd.in/gb48HZdY
    `,
    githubUrl: 'https://github.com/Kushal216/hamro-menchhayayem',
    liveUrl: 'https://hamromenchhayayem.vercel.app/',
  },
  {
    id: '4',
    title: 'pseudo-database',
    description:
      'A simple npm utility package that creates and manages a pseudo database directory for lightweight data persistence and experimentation.',
    techStack: ['JavaScript', 'Node.js', 'npm'],
    imageUrl:
      'https://kinsta.com/wp-content/uploads/2022/07/nodejs-fs-image.jpeg',
    status: 'Completed',
    fullDetails: `pseudo-database is a utility npm package designed to simulate a lightweight database by creating a "pseudo-database" folder and managing data using file system operations.

This package provides basic infrastructure for storing and retrieving structured data without relying on a full database server. It is ideal for prototyping, simple storage needs, and experiments where a real database is unnecessary.

Key features:
- Creates a pseudo database directory using file handling
- Simple API for basic read/write operations
- Useful for local testing and small personal projects

Tech stack: JavaScript, Node.js
Package registry: npm
Purpose: Lightweight persistence and learning tool`,
    githubUrl: 'https://github.com/sunil-bhattaraii/pseudo-database',
  },
  {
    id: '2',
    title: 'Chess Opening Trainer',
    description:
      'A focused chess learning platform built to train and reinforce opening theory through structured practice and repetition.',
    techStack: ['vibecoding', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    imageUrl:
      'https://res.cloudinary.com/dggnne5ja/image/upload/v1771578032/chess_project_placeholder.png',
    status: 'Ongoing',
    fullDetails: `This is a personal chess learning project vibecoded primarily to train and improve understanding of chess openings.

The core goal of the project is to build strong opening foundations through repetition, pattern recognition, and interactive move validation. Instead of passively studying lines, the platform encourages active recall and structured training.

Key focus areas:
- Opening move trees and variations
- Move validation and feedback
- Training mode for repetition-based learning
- Clean and distraction-free UI for focused practice

This project also serves as a practical system design exercise, where logic handling, state management, and user interaction patterns are carefully structured.

Tech stack: Next.js, React, TypeScript, Tailwind CSS
Developer: Sunil Bhattarai
Purpose: Personal learning + public training tool`,
    githubUrl: 'https://github.com/your-username/chess-opening-trainer',
    liveUrl: 'https://chess.sunil-bhattarai.com.np/',
  },
  {
    id: '3',
    title: 'My Notes App',
    description:
      'A practice project built to strengthen React and JavaScript fundamentals by creating a simple note-taking application.',
    techStack: ['React', 'JavaScript', 'CSS', 'Vercel'],
    imageUrl:
      'https://res.cloudinary.com/dggnne5ja/image/upload/v1771578032/my_notes_app_placeholder.png',
    status: 'Completed',
    fullDetails: `This is a practice project focused on improving core React and JavaScript skills through hands-on application development.

The app allows users to create, view, and manage notes in a clean and responsive UI. It helped solidify understanding of React concepts such as component design, state management, event handling, and conditional rendering.

Key features:
- Add, edit, and delete notes
- Use of React hooks (useState, useEffect)
- Responsive layout
- Local storage persistence

Tech stack: React, JavaScript, CSS
Developer: Sunil Bhattarai
Purpose: Hands-on practice to strengthen frontend fundamentals.`,
    githubUrl: 'https://github.com/sunil-bhattaraii/My-Notes',
    liveUrl: 'https://my-notes-mocha-iota.vercel.app/',
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
