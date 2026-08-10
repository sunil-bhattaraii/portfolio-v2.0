import mongoose, { Schema, models, model } from 'mongoose';

export interface ChatMessageDoc {
  conversationId: string;
  role: 'user' | 'ai';
  content: string;
  ip: string;
  userAgent: string;
  createdAt: Date;
}

const ChatMessageSchema = new Schema<ChatMessageDoc>({
  conversationId: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'ai'] },
  content: { type: String, required: true },
  ip: { type: String, default: '' },
  userAgent: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

ChatMessageSchema.index({ conversationId: 1, createdAt: 1 });
ChatMessageSchema.index({ ip: 1, createdAt: 1 });

export const ChatMessageModel =
  (models.ChatMessage as mongoose.Model<ChatMessageDoc>) ??
  model<ChatMessageDoc>('ChatMessage', ChatMessageSchema);
