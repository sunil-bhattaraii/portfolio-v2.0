import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { ExperienceModel } from '@/models/Experience';
import { requireAdmin, serialize, invalidate } from '@/lib/api';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const experience = await ExperienceModel.findByIdAndUpdate(
      id,
      {
        role: body.role,
        company: body.company,
        duration: body.duration,
        description: Array.isArray(body.description) ? body.description : [],
        skills: Array.isArray(body.skills) ? body.skills : [],
        order: Number(body.order) || 0,
      },
      { new: true, runValidators: true }
    );
    if (!experience) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    invalidate('experience');
    return NextResponse.json(serialize(experience));
  } catch (error) {
    console.error('PATCH /api/experience/[id]:', error);
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await ExperienceModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    invalidate('experience');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/experience/[id]:', error);
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}
