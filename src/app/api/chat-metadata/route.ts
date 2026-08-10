import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api';

export const dynamic = 'force-dynamic';

interface IpMeta {
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
  asn: number;
}

const SKIP_IPS = new Set(['', 'unknown', '::1', '127.0.0.1', 'localhost']);

/**
 * Admin-only: looks up IP metadata via ipwho.is. Metadata is NOT stored —
 * it is generated fresh on every dashboard view.
 */
export async function GET(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const raw = req.nextUrl.searchParams.get('ips') ?? '';
  const unique = [
    ...new Set(
      raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    ),
  ]
    .filter((ip) => !SKIP_IPS.has(ip))
    .slice(0, 30);

  const result: Record<string, IpMeta> = {};

  await Promise.all(
    unique.map(async (ip) => {
      try {
        const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
          cache: 'no-store',
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!data?.success) return;
        result[ip] = {
          country: data.country ?? '',
          region: data.region ?? '',
          city: data.city ?? '',
          latitude: typeof data.latitude === 'number' ? data.latitude : 0,
          longitude: typeof data.longitude === 'number' ? data.longitude : 0,
          timezone: data.timezone?.id ?? '',
          isp: data.connection?.isp ?? '',
          asn: typeof data.connection?.asn === 'number' ? data.connection.asn : 0,
        };
      } catch (error) {
        console.error(`ipwho.is lookup failed for ${ip}:`, error);
      }
    })
  );

  return NextResponse.json(result);
}
