import { auth, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/api/auth/signin?callbackUrl=/admin');
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span className="font-black tracking-tight text-white">
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500 font-medium hidden md:inline">
              {session.user.email}
            </span>
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
              }}
            >
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-sm font-bold text-zinc-300 transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <AdminNav />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">{children}</main>
    </div>
  );
}
