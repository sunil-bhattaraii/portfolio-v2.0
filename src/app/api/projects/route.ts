import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { ProjectModel } from '@/models/Project';
import { requireAdmin, serialize, serializeMany, invalidate } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const projects = await ProjectModel.find().sort({ order: 1, title: 1 }).lean();
    return NextResponse.json(serializeMany(projects));
  } catch (error) {
    console.error('GET /api/projects:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const body = await req.json();
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }
    const project = await ProjectModel.create({
      title: body.title,
      description: body.description,
      techStack: Array.isArray(body.techStack) ? body.techStack : [],
      imageUrl: body.imageUrl ?? '',
      githubUrl: body.githubUrl ?? '',
      liveUrl: body.liveUrl ?? '',
      status: body.status ?? 'Completed',
      fullDetails: body.fullDetails ?? '',
      order: Number(body.order) || 0,
    });
    invalidate('projects');
    return NextResponse.json(serialize(project), { status: 201 });
  } catch (error) {
    console.error('POST /api/projects:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
