import mongoose, { Schema, models, model } from 'mongoose';
import type { SiteConfigData } from '../types';

export interface SiteConfigDoc extends SiteConfigData {
  key: string;
}

const SiteConfigSchema = new Schema<SiteConfigDoc>({
  key: { type: String, default: 'site', unique: true },
  hero: {
    name: { type: String, default: '' },
    role: { type: String, default: '' },
  },
  about: {
    intro: { type: [String], default: [] },
    facts: {
      type: [
        {
          icon: { type: String, default: 'Star' },
          label: { type: String, default: '' },
          value: { type: String, default: '' },
        },
      ],
      default: [],
    },
    hobbies: {
      type: [
        {
          icon: { type: String, default: '' },
          title: { type: String, default: '' },
        },
      ],
      default: [],
    },
  },
  contact: {
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
  },
  version: { type: String, default: '' },
});

export const SiteConfigModel =
  (models.SiteConfig as mongoose.Model<SiteConfigDoc>) ??
  model<SiteConfigDoc>('SiteConfig', SiteConfigSchema);
