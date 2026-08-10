import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { ProjectModel } from '@/models/Project';
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
    const project = await ProjectModel.findByIdAndUpdate(
      id,
      {
        title: body.title,
        description: body.description,
        techStack: Array.isArray(body.techStack) ? body.techStack : [],
        imageUrl: body.imageUrl ?? '',
        githubUrl: body.githubUrl ?? '',
        liveUrl: body.liveUrl ?? '',
        status: body.status ?? 'Completed',
        fullDetails: body.fullDetails ?? '',
        order: Number(body.order) || 0,
      },
      { new: true, runValidators: true }
    );
    if (!project) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    invalidate('projects');
    return NextResponse.json(serialize(project));
  } catch (error) {
    console.error('PATCH /api/projects/[id]:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await ProjectModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    invalidate('projects');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/projects/[id]:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
