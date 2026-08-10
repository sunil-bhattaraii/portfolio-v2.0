import mongoose, { Schema, models, model } from 'mongoose';

export interface AIConfig {
  key: string;
  instruction: string;
  model: string;
  updatedAt?: Date;
}

const AIConfigSchema = new Schema<AIConfig>({
  key: { type: String, required: true, unique: true },
  instruction: { type: String, default: '' },
  model: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
});

export const AIConfigModel =
  (models.AIConfig as mongoose.Model<AIConfig>) ??
  model<AIConfig>('AIConfig', AIConfigSchema);
