import type { Skill, Qualification, Project, Experience, Social, SiteConfigData } from '../types';

export interface SeedSkill extends Skill {
  order?: number;
}
export interface SeedProject extends Project {
  order?: number;
}
export interface SeedQualification extends Qualification {
  order?: number;
}
export interface SeedExperience extends Experience {
  order?: number;
}

export const SEED_SKILLS: SeedSkill[] = [
  {
    id: '1',
    name: 'MERN Stack Development',
    level: 'Experienced',
    icon: 'Layers',
    highlight: true,
    categories: ['Core', 'Fullstack'],
    order: 1,
  },
  {
    id: '2',
    name: 'React / Next.js',
    level: 'Intermediate',
    icon: 'Code2',
    highlight: true,
    categories: ['Core', 'Frontend'],
    order: 2,
  },
  {
    id: '3',
    name: 'Node.js / Express Backend',
    level: 'Intermediate',
    icon: 'Terminal',
    highlight: true,
    categories: ['Core', 'Backend'],
    order: 3,
  },
  {
    id: '4',
    name: 'Database Design & SQL',
    level: 'Intermediate',
    icon: 'Database',
    highlight: true,
    categories: ['Core', 'Backend'],
    order: 4,
  },
  {
    id: '5',
    name: 'Systems & OS Fundamentals',
    level: 'Intermediate',
    icon: 'Cpu',
    highlight: true,
    categories: ['Core', 'Systems'],
    order: 5,
  },
  {
    id: '6',
    name: 'Data Structures & Algorithms',
    level: 'Intermediate',
    icon: 'Binary',
    highlight: true,
    categories: ['Core'],
    order: 6,
  },
  {
    id: '7',
    name: 'C / C++ Programming',
    level: 'Intermediate',
    icon: 'Code',
    highlight: false,
    categories: ['Systems'],
    order: 7,
  },
  {
    id: '8',
    name: 'MongoDB (NoSQL)',
    level: 'Intermediate',
    icon: 'Database',
    highlight: false,
    categories: ['Backend'],
    order: 8,
  },
  {
    id: '9',
    name: 'Authentication (JWT, Sessions)',
    level: 'Intermediate',
    icon: 'Shield',
    highlight: false,
    categories: ['Backend'],
    order: 9,
  },
  {
    id: '10',
    name: 'Git & Linux (Ubuntu)',
    level: 'Experienced',
    icon: 'GitBranch',
    highlight: false,
    categories: ['DevOps', 'Systems'],
    order: 10,
  },
  {
    id: '11',
    name: 'REST API Design',
    level: 'Intermediate',
    icon: 'Globe',
    highlight: false,
    categories: ['Backend'],
    order: 11,
  },
  {
    id: '12',
    name: 'Mathematics for Computing',
    level: 'Experienced',
    icon: 'FunctionSquare',
    highlight: false,
    categories: ['Core'],
    order: 12,
  },
];

export const SEED_EXPERIENCES: SeedExperience[] = [];

export const SEED_QUALIFICATIONS: SeedQualification[] = [
  {
    id: '1',
    title:
      'Bachelor of Science in Computer Science and Information Technology (BSc CSIT)',
    institute: 'Tribhuvan University (TU)',
    year: '2025 - Ongoing',
    details:
      'Focused on systems, databases, software engineering, and theoretical computer science.',
    type: 'degree',
    order: 1,
  },
  {
    id: '2',
    title: '+2 Science',
    institute: 'Sunsari Crystal Academy',
    year: '2022 - 2024',
    details:
      'Higher secondary education under Nepal Education Board (NEB) with science stream.',
    type: 'degree',
    order: 2,
  },
];

export const SEED_PROJECTS: SeedProject[] = [
  {
    id: '1',
    title: 'Hamro Menchhayayem',
    description:
      'A simple project to showcase my hometown Menchhayayem Rural Municipality to the digital world in collaboration with my friend.',
    techStack: ['Next.js', 'MongoDB', 'Vercel', 'Tailwind'],
    imageUrl:
      'https://res.cloudinary.com/dggnne5ja/image/upload/v1772105556/hamro-menchhayayem_preview_wb7rzh.webp',
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
    order: 1,
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
    order: 2,
  },
  {
    id: '2',
    title: 'Chess Opening Trainer',
    description:
      'A focused chess learning platform built to train and reinforce opening theory through structured practice and repetition.',
    techStack: ['vibecoding', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    imageUrl:
      'https://res.cloudinary.com/dggnne5ja/image/upload/v1772105556/chess-trainer_preview_hq6qws.webp',
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
    order: 3,
  },
  {
    id: '3',
    title: 'My Notes App',
    description:
      'A practice project built to strengthen React and JavaScript fundamentals by creating a simple note-taking application.',
    techStack: ['React', 'JavaScript', 'CSS', 'Vercel'],
    imageUrl:
      'https://res.cloudinary.com/dggnne5ja/image/upload/v1772105556/my-notes_preview_gioedz.webp',
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
    order: 4,
  },
];

export const SEED_SITE_CONFIG: SiteConfigData = {
  hero: {
    name: 'Sunil Bhattarai',
    role: 'Fullstack Software Developer',
  },
  about: {
    intro: [
      "Hey! I'm Sunil Bhattarai, a fullstack software developer who loves turning complex problems into clean, intuitive experiences. I care deeply about the code I write — not just that it works, but that it's maintainable, scalable, and a pleasure to read.",
      "I started coding out of sheer curiosity, and that curiosity has never left. Whether it's architecting a backend system, polishing a UI interaction, or exploring a new framework on a weekend, I'm always building something.",
    ],
    facts: [
      { icon: 'MapPin', label: 'Based in', value: 'Kathmandu, Nepal' },
      { icon: 'Coffee', label: 'Fuel', value: 'Coffee & curiosity' },
      { icon: 'Sparkles', label: 'Currently', value: 'Open to opportunities' },
    ],
    hobbies: [
      { icon: 'Music', title: 'Music' },
      { icon: 'Chess', title: 'Chess' },
      { icon: 'BookOpen', title: 'Reading' },
      { icon: 'Gamepad2', title: 'Gaming' },
      { icon: 'Camera', title: 'Photography' },
      { icon: 'Mountain', title: 'Hiking' },
    ],
  },
  contact: {
    email: 'bhattaraisunil76@gmail.com',
    phone: '+977-9866325865',
    location: 'Kathmandu, Nepal',
  },
  version: 'v1.4.2',
};

export const SEED_SOCIALS: Social[] = [
  {
    platform: 'github',
    label: 'GitHub',
    href: 'https://github.com/sunil-bhattaraii',
    order: 1,
    showInHero: true,
    showInContact: false,
  },
  {
    platform: 'leetcode',
    label: 'LeetCode',
    href: 'https://leetcode.com/u/sunil-bhattaraii/',
    order: 2,
    showInHero: true,
    showInContact: false,
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sunil-bhattaraii/',
    order: 3,
    showInHero: true,
    showInContact: true,
  },
  {
    platform: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/sunil._.bhattarai_/',
    order: 4,
    showInHero: true,
    showInContact: true,
  },
  {
    platform: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/Sunil.bhattaraiiii',
    order: 5,
    showInHero: true,
    showInContact: true,
  },
  {
    platform: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/9779866325865?text=hello%20I%20came%20here%20from%20your%20portfolio%20',
    order: 6,
    showInHero: true,
    showInContact: true,
  },
];

export const SEED_ALLOWLIST_EMAILS: string[] = ['bhattaraisunil76@gmail.com'];
