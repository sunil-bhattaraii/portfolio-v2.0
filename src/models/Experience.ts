import mongoose, { Schema, models, model } from 'mongoose';

export interface ExperienceDoc {
  role: string;
  company: string;
  duration: string;
  description: string[];
  skills: string[];
  order: number;
}

const ExperienceSchema = new Schema<ExperienceDoc>({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: [String], default: [] },
  skills: { type: [String], default: [] },
  order: { type: Number, default: 0 },
});

export const ExperienceModel =
  (models.Experience as mongoose.Model<ExperienceDoc>) ??
  model<ExperienceDoc>('Experience', ExperienceSchema);
