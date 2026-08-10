import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { ChatMessageModel } from '@/models/ChatMessage';

export const dynamic = 'force-dynamic';

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

/**
 * Fire-and-forget chat persistence. Called without awaiting from the client,
 * so it must stay fast and tolerate failures.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const conversationId =
    typeof body?.conversationId === 'string'
      ? body.conversationId.trim()
      : '';
  const content =
    typeof body?.content === 'string' ? body.content.trim() : '';
  const role = body?.role === 'ai' ? 'ai' : 'user';

  if (!conversationId || !content) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await dbConnect();
    await ChatMessageModel.create({
      conversationId,
      role,
      content,
      ip: getClientIp(req),
      userAgent: req.headers.get('user-agent') ?? '',
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('POST /api/chat/store:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
