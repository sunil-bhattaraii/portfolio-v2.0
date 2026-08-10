import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { QualificationModel } from '@/models/Qualification';
import { requireAdmin, serialize, serializeMany, invalidate } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const qualifications = await QualificationModel.find().sort({ order: 1 }).lean();
    return NextResponse.json(serializeMany(qualifications));
  } catch (error) {
    console.error('GET /api/qualifications:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const body = await req.json();
    if (!body.title || !body.institute || !body.year || !body.type) {
      return NextResponse.json(
        { error: 'Title, institute, year and type are required' },
        { status: 400 }
      );
    }
    const qualification = await QualificationModel.create({
      title: body.title,
      institute: body.institute,
      year: body.year,
      details: body.details ?? '',
      type: body.type || 'degree',
      order: Number(body.order) || 0,
    });
    invalidate('qualifications');
    return NextResponse.json(serialize(qualification), { status: 201 });
  } catch (error) {
    console.error('POST /api/qualifications:', error);
    return NextResponse.json({ error: 'Failed to create qualification' }, { status: 500 });
  }
}
