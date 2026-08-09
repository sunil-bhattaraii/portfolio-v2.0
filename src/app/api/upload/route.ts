import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import { requireAdmin } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await req.json();
    const dataUrl = String(body.dataUrl ?? '');
    if (!dataUrl.startsWith('data:image/')) {
      return NextResponse.json(
        { error: 'Invalid image payload. Expected a base64 image data URL.' },
        { status: 400 }
      );
    }
    const url = await uploadImage(dataUrl);
    return NextResponse.json({ url });
  } catch (error) {
    console.error('POST /api/upload:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
