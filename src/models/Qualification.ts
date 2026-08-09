import mongoose, { Schema, models, model } from 'mongoose';
import type { Qualification } from '../types';

export interface QualificationDoc {
  title: string;
  institute: string;
  year: string;
  details: string;
  type: Qualification['type'];
  order: number;
}

const QualificationSchema = new Schema<QualificationDoc>({
  title: { type: String, required: true },
  institute: { type: String, required: true },
  year: { type: String, required: true },
  details: { type: String, default: '' },
  type: {
    type: String,
    required: true,
    enum: ['degree', 'certification'],
  },
  order: { type: Number, default: 0 },
});

export const QualificationModel =
  (models.Qualification as mongoose.Model<QualificationDoc>) ??
  model<QualificationDoc>('Qualification', QualificationSchema);
