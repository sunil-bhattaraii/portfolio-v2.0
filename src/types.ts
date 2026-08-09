export type SkillLevel = 'Beginner' | 'Intermediate' | 'Experienced';
export type SkillCategory =
  | 'Core'
  | 'Frontend'
  | 'Backend'
  | 'DevOps'
  | 'Design';

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  icon: string; // Lucide icon name or URL
  highlight: boolean;
  categories: string[];
}

export interface Qualification {
  id: string;
  title: string;
  institute: string;
  year: string;
  details?: string;
  type: 'degree' | 'certification';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  status: 'Completed' | 'Ongoing';
  fullDetails?: string;
}

export interface Social {
  id?: string;
  platform: string;
  label: string;
  href: string;
  order: number;
  showInHero: boolean;
  showInContact: boolean;
}

export interface SiteConfigData {
  hero: {
    name: string;
    role: string;
  };
  about: {
    intro: string[];
    facts: { icon: string; label: string; value: string }[];
    hobbies: { icon: string; title: string }[];
  };
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  version: string;
}

export enum Section {
  Hero = 'home',
  About = 'about',
  Skills = 'skills',
  Experience = 'experience',
  Qualifications = 'qualifications',
  Projects = 'projects',
  Contact = 'contact',
}
