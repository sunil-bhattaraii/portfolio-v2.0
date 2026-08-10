import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { AIConfigModel } from '@/models/AIConfig';
import { requireAdmin } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const doc = await AIConfigModel.findOne({ key: 'ai' }).lean();
    return NextResponse.json({
      instruction: doc?.instruction ?? '',
      model: doc?.model ?? '',
    });
  } catch (error) {
    console.error('GET /api/ai-config:', error);
    return NextResponse.json({ error: 'Failed to fetch AI config' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const body = await req.json();
    const instruction = String(body.instruction ?? '').trim();
    const model = String(body.model ?? '').trim();
    await AIConfigModel.findOneAndUpdate(
      { key: 'ai' },
      { key: 'ai', instruction, model, updatedAt: new Date() },
      { upsert: true, runValidators: true }
    );
    return NextResponse.json({ instruction, model });
  } catch (error) {
    console.error('PUT /api/ai-config:', error);
    return NextResponse.json({ error: 'Failed to save AI config' }, { status: 500 });
  }
}
