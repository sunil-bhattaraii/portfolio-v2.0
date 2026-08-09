import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { auth } from './auth';
import { dbConnect } from './db';
import { AllowlistModel } from '@/models/Allowlist';

export const BASE_URL =
  process.env.APP_URL ?? process.env.AUTH_URL ?? 'http://localhost:3000';

export function apiUrl(path: string): string {
  return `${BASE_URL}${path}`;
}

/**
 * Cached public fetch — results are stored in the Next.js data cache and
 * invalidated via `revalidateTag(tag)` after admin mutations.
 */
export async function fetchPublic<T>(path: string, tag: string): Promise<T | null> {
  try {
    const res = await fetch(apiUrl(path), { next: { tags: [tag] } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (error) {
    console.error(`fetchPublic(${path}) failed:`, error);
    return null;
  }
}

/**
 * Un-cached fetch for admin pages — always reads fresh data.
 */
export async function fetchAdmin<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(apiUrl(path), { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (error) {
    console.error(`fetchAdmin(${path}) failed:`, error);
    return null;
  }
}

/** Returns the authenticated session or null. */
export async function getSession() {
  return auth();
}

/** Serializes a lean mongoose doc into a plain object with a string `id`. */
export function serialize<T extends { _id: unknown }>(
  doc: T
): Omit<T, '_id' | '__v'> & { id: string } {
  const { _id, __v, ...rest } = doc as Record<string, unknown>;
  return { ...rest, id: String(_id) } as Omit<T, '_id' | '__v'> & { id: string };
}

/** Serializes a lean mongoose doc into a plain object with a string `id`. */
export function serializeMany<T extends { _id: unknown }>(docs: T[]): (Omit<T, '_id' | '__v'> & { id: string })[] {
  return docs.map(serialize);
}

/** Guard for admin-only route handlers. Returns a 401 response if not authed. */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const allowed = await AllowlistModel.exists({ email: session.user.email.toLowerCase() });
  if (!allowed) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return null;
}

/**
 * Invalidates cached public data after an admin mutation.
 * Expires the data-cache entries tagged with `tag` immediately, and forces
 * the home route (which renders all content sections) to re-render on the
 * next request so edits show up right away.
 */
export function invalidate(tag: string) {
  revalidateTag(tag, { expire: 0 });
  revalidatePath('/', 'layout');
}
