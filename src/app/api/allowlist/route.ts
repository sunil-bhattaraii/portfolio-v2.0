import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { AllowlistModel } from '@/models/Allowlist';
import { requireAdmin, serialize, serializeMany } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const emails = await AllowlistModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(serializeMany(emails));
  } catch (error) {
    console.error('GET /api/allowlist:', error);
    return NextResponse.json({ error: 'Failed to fetch allowlist' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const body = await req.json();
    const email = String(body.email ?? '').toLowerCase().trim();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    const existing = await AllowlistModel.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: 'This email is already in the allowlist' },
        { status: 409 }
      );
    }
    const entry = await AllowlistModel.create({ email });
    return NextResponse.json(serialize(entry), { status: 201 });
  } catch (error) {
    console.error('POST /api/allowlist:', error);
    return NextResponse.json({ error: 'Failed to add email' }, { status: 500 });
  }
}
