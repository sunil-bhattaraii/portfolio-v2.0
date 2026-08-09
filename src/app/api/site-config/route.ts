import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { SiteConfigModel } from '@/models/SiteConfig';
import { requireAdmin, invalidate } from '@/lib/api';
import type { SiteConfigData } from '@/types';

export const dynamic = 'force-dynamic';

const DEFAULT_CONFIG: SiteConfigData = {
  hero: { name: '', role: '' },
  about: { intro: [], facts: [], hobbies: [] },
  contact: { email: '', phone: '', location: '' },
  version: '',
};

export async function GET() {
  try {
    await dbConnect();
    const config = await SiteConfigModel.findOne({ key: 'site' }).lean();
    return NextResponse.json(config ?? DEFAULT_CONFIG);
  } catch (error) {
    console.error('GET /api/site-config:', error);
    return NextResponse.json(DEFAULT_CONFIG, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await dbConnect();
    const body = (await req.json()) as Partial<SiteConfigData>;
    const config = await SiteConfigModel.findOneAndUpdate(
      { key: 'site' },
      {
        key: 'site',
        hero: body.hero ?? {},
        about: body.about ?? {},
        contact: body.contact ?? {},
        version: body.version ?? '',
      },
      { upsert: true, new: true, runValidators: true }
    );
    invalidate('site-config');
    return NextResponse.json(config);
  } catch (error) {
    console.error('PUT /api/site-config:', error);
    return NextResponse.json({ error: 'Failed to save site config' }, { status: 500 });
  }
}
