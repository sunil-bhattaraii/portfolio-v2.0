import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { ExperienceModel } from '@/models/Experience';
import { requireAdmin, serialize, serializeMany, invalidate } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const experiences = await ExperienceModel.find().sort({ order: 1 }).lean();
    return NextResponse.json(serializeMany(experiences));
  } catch (error) {
    console.error('GET /api/experience:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const body = await req.json();
    if (!body.role || !body.company || !body.duration) {
      return NextResponse.json(
        { error: 'Role, company and duration are required' },
        { status: 400 }
      );
    }
    const experience = await ExperienceModel.create({
      role: body.role,
      company: body.company,
      duration: body.duration,
      description: Array.isArray(body.description) ? body.description : [],
      skills: Array.isArray(body.skills) ? body.skills : [],
      order: Number(body.order) || 0,
    });
    invalidate('experience');
    return NextResponse.json(serialize(experience), { status: 201 });
  } catch (error) {
    console.error('POST /api/experience:', error);
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}
