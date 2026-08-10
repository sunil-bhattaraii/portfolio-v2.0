import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { SkillModel } from '@/models/Skill';
import { requireAdmin, serialize, serializeMany, invalidate } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const skills = await SkillModel.find().sort({ order: 1, name: 1 }).lean();
    return NextResponse.json(serializeMany(skills));
  } catch (error) {
    console.error('GET /api/skills:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    const skill = await SkillModel.create({
      name: body.name,
      level: body.level || 'Intermediate',
      icon: body.icon ?? 'Monitor',
      highlight: Boolean(body.highlight),
      categories: Array.isArray(body.categories) ? body.categories : [],
      order: Number(body.order) || 0,
    });
    invalidate('skills');
    return NextResponse.json(serialize(skill), { status: 201 });
  } catch (error) {
    console.error('POST /api/skills:', error);
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}
