import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { QualificationModel } from '@/models/Qualification';
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
    const qualification = await QualificationModel.findByIdAndUpdate(
      id,
      {
        title: body.title,
        institute: body.institute,
        year: body.year,
        details: body.details ?? '',
        type: body.type,
        order: Number(body.order) || 0,
      },
      { new: true, runValidators: true }
    );
    if (!qualification) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    invalidate('qualifications');
    return NextResponse.json(serialize(qualification));
  } catch (error) {
    console.error('PATCH /api/qualifications/[id]:', error);
    return NextResponse.json({ error: 'Failed to update qualification' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await QualificationModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    invalidate('qualifications');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/qualifications/[id]:', error);
    return NextResponse.json({ error: 'Failed to delete qualification' }, { status: 500 });
  }
}
