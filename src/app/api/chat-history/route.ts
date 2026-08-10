import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { ChatMessageModel } from '@/models/ChatMessage';
import { requireAdmin, serializeMany } from '@/lib/api';

export const dynamic = 'force-dynamic';

/** Admin-only: returns stored chat messages for the dashboard. */
export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const messages = await ChatMessageModel.find()
      .sort({ createdAt: 1 })
      .limit(2000)
      .lean();
    return NextResponse.json(serializeMany(messages));
  } catch (error) {
    console.error('GET /api/chat-history:', error);
    return NextResponse.json([], { status: 500 });
  }
}
