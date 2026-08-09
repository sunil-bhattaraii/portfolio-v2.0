import mongoose, { Schema, models, model } from 'mongoose';
import type { Skill } from '../types';

export interface SkillDoc {
  name: string;
  level: Skill['level'];
  icon: string;
  highlight: boolean;
  categories: string[];
  order: number;
}

const SkillSchema = new Schema<SkillDoc>({
  name: { type: String, required: true },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Experienced'],
  },
  icon: { type: String, default: 'Monitor' },
  highlight: { type: Boolean, default: false },
  categories: { type: [String], default: [] },
  order: { type: Number, default: 0 },
});

export const SkillModel =
  (models.Skill as mongoose.Model<SkillDoc>) ?? model<SkillDoc>('Skill', SkillSchema);
