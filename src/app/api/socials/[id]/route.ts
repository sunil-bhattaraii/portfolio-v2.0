import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { SocialModel } from '@/models/Social';
import { requireAdmin, invalidate } from '@/lib/api';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const social = await SocialModel.findByIdAndUpdate(
      id,
      {
        platform: body.platform,
        label: body.label ?? '',
        href: body.href,
        order: Number(body.order) || 0,
        showInHero: Boolean(body.showInHero),
        showInContact: Boolean(body.showInContact),
      },
      { new: true, runValidators: true }
    );
    if (!social) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    invalidate('socials');
    return NextResponse.json(social);
  } catch (error) {
    console.error('PATCH /api/socials/[id]:', error);
    return NextResponse.json({ error: 'Failed to update social' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await SocialModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    invalidate('socials');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/socials/[id]:', error);
    return NextResponse.json({ error: 'Failed to delete social' }, { status: 500 });
  }
}
