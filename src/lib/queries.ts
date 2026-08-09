import { dbConnect } from './db';
import { serialize } from './api';
import { SkillModel } from '@/models/Skill';
import { ProjectModel } from '@/models/Project';
import { ExperienceModel } from '@/models/Experience';
import { QualificationModel } from '@/models/Qualification';
import { SocialModel } from '@/models/Social';
import { SiteConfigModel } from '@/models/SiteConfig';
import { AIConfigModel } from '@/models/AIConfig';
import { AllowlistModel } from '@/models/Allowlist';
import { DEFAULT_AI_INSTRUCTION } from './ai-instruction';
import type { Skill, Project, Experience, Qualification, Social, SiteConfigData } from '@/types';

type Nullable<T> = T | null;

/** The AI persona instruction saved by the admin (may be empty = use default). */
export async function getAIStoredInstruction(): Promise<string> {
  try {
    await dbConnect();
    const doc = await AIConfigModel.findOne({ key: 'ai' }).lean();
    return doc?.instruction?.trim() ?? '';
  } catch (error) {
    console.error('getAIStoredInstruction failed:', error);
    return '';
  }
}

/** The effective AI instruction: saved value, or the built-in default. */
export async function getAIInstruction(): Promise<string> {
  const stored = await getAIStoredInstruction();
  return stored || DEFAULT_AI_INSTRUCTION;
}

export async function getAllowlist(): Promise<
  { email: string; createdAt?: Date; id: string }[]
> {
  try {
    await dbConnect();
    const docs = await AllowlistModel.find().sort({ createdAt: -1 }).lean();
    return docs.map(serialize);
  } catch (error) {
    console.error('getAllowlist failed:', error);
    return [];
  }
}

/** Reads site config directly from Mongo (no HTTP self-fetch). */
export async function getSiteConfig(): Promise<Nullable<SiteConfigData>> {
  try {
    await dbConnect();
    const config = await SiteConfigModel.findOne({ key: 'site' }).lean();
    if (!config) return null;
    // Mongoose lean docs keep ObjectId `_id` on nested subdocs (facts/hobbies),
    // which cannot cross the server -> client component boundary. Deep-clone to
    // plain JSON-safe values and drop Mongo metadata.
    return JSON.parse(
      JSON.stringify(config, (key, value) =>
        key === '_id' || key === '__v' ? undefined : value
      )
    ) as SiteConfigData;
  } catch (error) {
    console.error('getSiteConfig failed:', error);
    return null;
  }
}

/** Reads skills, sorted by order then name. */
export async function getSkills(): Promise<Skill[]> {
  try {
    await dbConnect();
    const docs = await SkillModel.find().sort({ order: 1, name: 1 }).lean();
    return docs.map(serialize) as Skill[];
  } catch (error) {
    console.error('getSkills failed:', error);
    return [];
  }
}

/** Reads projects, sorted by order then createdAt. */
export async function getProjects(): Promise<Project[]> {
  try {
    await dbConnect();
    const docs = await ProjectModel.find().sort({ order: 1, createdAt: -1 }).lean();
    return docs.map(serialize) as Project[];
  } catch (error) {
    console.error('getProjects failed:', error);
    return [];
  }
}

/** Reads experiences, sorted by order then createdAt. */
export async function getExperience(): Promise<Experience[]> {
  try {
    await dbConnect();
    const docs = await ExperienceModel.find().sort({ order: 1, createdAt: -1 }).lean();
    return docs.map(serialize) as Experience[];
  } catch (error) {
    console.error('getExperience failed:', error);
    return [];
  }
}

/** Reads qualifications, sorted by order then createdAt. */
export async function getQualifications(): Promise<Qualification[]> {
  try {
    await dbConnect();
    const docs = await QualificationModel.find().sort({ order: 1, createdAt: -1 }).lean();
    return docs.map(serialize) as Qualification[];
  } catch (error) {
    console.error('getQualifications failed:', error);
    return [];
  }
}

/** Reads socials, sorted by order. */
export async function getSocials(): Promise<Social[]> {
  try {
    await dbConnect();
    const docs = await SocialModel.find().sort({ order: 1, createdAt: 1 }).lean();
    return docs.map(serialize) as Social[];
  } catch (error) {
    console.error('getSocials failed:', error);
    return [];
  }
}
