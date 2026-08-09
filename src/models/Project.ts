import mongoose, { Schema, models, model } from 'mongoose';
import type { Project } from '../types';

export interface ProjectDoc {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  status: Project['status'];
  fullDetails: string;
  order: number;
}

const ProjectSchema = new Schema<ProjectDoc>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: { type: [String], default: [] },
  imageUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  status: {
    type: String,
    required: true,
    enum: ['Completed', 'Ongoing'],
  },
  fullDetails: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

export const ProjectModel =
  (models.Project as mongoose.Model<ProjectDoc>) ??
  model<ProjectDoc>('Project', ProjectSchema);
