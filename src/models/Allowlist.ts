import mongoose, { Schema, models, model } from 'mongoose';

export interface Allowlist {
  email: string;
  createdAt?: Date;
}

const AllowlistSchema = new Schema<Allowlist>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export const AllowlistModel =
  (models.Allowlist as mongoose.Model<Allowlist>) ??
  model<Allowlist>('Allowlist', AllowlistSchema);
