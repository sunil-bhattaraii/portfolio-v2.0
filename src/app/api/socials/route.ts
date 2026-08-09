import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { SocialModel } from '@/models/Social';
import { requireAdmin, serializeMany, invalidate } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const socials = await SocialModel.find().sort({ order: 1 }).lean();
    return NextResponse.json(serializeMany(socials));
  } catch (error) {
    console.error('GET /api/socials:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const body = await req.json();
    if (!body.platform || !body.href) {
      return NextResponse.json(
        { error: 'Platform and href are required' },
        { status: 400 }
      );
    }
    const social = await SocialModel.create({
      platform: body.platform,
      label: body.label ?? '',
      href: body.href,
      order: Number(body.order) || 0,
      showInHero: Boolean(body.showInHero),
      showInContact: Boolean(body.showInContact),
    });
    invalidate('socials');
    return NextResponse.json(social, { status: 201 });
  } catch (error) {
    console.error('POST /api/socials:', error);
    return NextResponse.json({ error: 'Failed to create social' }, { status: 500 });
  }
}
