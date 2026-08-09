import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { AllowlistModel } from '@/models/Allowlist';
import { requireAdmin } from '@/lib/api';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await AllowlistModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/allowlist/[id]:', error);
    return NextResponse.json({ error: 'Failed to remove email' }, { status: 500 });
  }
}
