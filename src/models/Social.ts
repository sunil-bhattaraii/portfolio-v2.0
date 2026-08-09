import mongoose, { Schema, models, model } from 'mongoose';

export interface SocialDoc {
  platform: string;
  label: string;
  href: string;
  order: number;
  showInHero: boolean;
  showInContact: boolean;
}

const SocialSchema = new Schema<SocialDoc>({
  platform: { type: String, required: true },
  label: { type: String, default: '' },
  href: { type: String, required: true },
  order: { type: Number, default: 0 },
  showInHero: { type: Boolean, default: false },
  showInContact: { type: Boolean, default: false },
});

export const SocialModel =
  (models.Social as mongoose.Model<SocialDoc>) ??
  model<SocialDoc>('Social', SocialSchema);
