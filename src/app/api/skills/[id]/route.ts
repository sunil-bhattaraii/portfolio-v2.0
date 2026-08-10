import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { SkillModel } from '@/models/Skill';
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
    const skill = await SkillModel.findByIdAndUpdate(
      id,
      {
        name: body.name,
        level: body.level || 'Intermediate',
        icon: body.icon,
        highlight: Boolean(body.highlight),
        categories: Array.isArray(body.categories) ? body.categories : [],
        order: Number(body.order) || 0,
      },
      { new: true, runValidators: true }
    );
    if (!skill) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    invalidate('skills');
    return NextResponse.json(serialize(skill));
  } catch (error) {
    console.error('PATCH /api/skills/[id]:', error);
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await SkillModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    invalidate('skills');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/skills/[id]:', error);
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
  }
}
