import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { cookies } from 'next/headers';
import { dbConnect } from './db';
import { AllowlistModel } from '../models/Allowlist';

const ADMIN_COOKIE = 'isAdmin';
const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

async function setAdminCookie() {
  const store = await cookies();
  store.set(ADMIN_COOKIE, 'true', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
}

async function clearAdminCookie() {
  const store = await cookies();
  store.set(ADMIN_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}

interface GitHubEmail {
  email: string;
  primary?: boolean;
  verified?: boolean;
}

async function getGitHubEmail(accessToken: string): Promise<string | null> {
  try {
    const res = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const emails: GitHubEmail[] = await res.json();
    const primary =
      emails.find((e) => e.primary && e.verified) ??
      emails.find((e) => e.verified) ??
      emails[0];
    return primary?.email ?? null;
  } catch (error) {
    console.error('Failed to fetch GitHub emails:', error);
    return null;
  }
}

async function isEmailAllowed(email: string): Promise<boolean> {
  try {
    await dbConnect();
    const found = await AllowlistModel.findOne({
      email: email.toLowerCase().trim(),
    });
    return Boolean(found);
  } catch (error) {
    console.error('Allowlist check failed:', error);
    return false;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      authorization: { params: { scope: 'read:user user:email' } },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account, profile }) {
      let email: string | null = user.email ?? profile?.email ?? null;

      // GitHub may hide the profile email; fall back to the user/emails API.
      if (!email && account?.access_token) {
        email = await getGitHubEmail(account.access_token);
      }

      if (!email) {
        console.error('No email available from GitHub account.');
        return false;
      }

      return isEmailAllowed(email);
    },
    async jwt({ token, user }) {
      if (user?.email) token.email = user.email;
      return token;
    },
    async session({ session, token }) {
      if (token.email && session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  events: {
    async signIn() {
      // Only reached for allowlisted users (signIn callback gates access).
      await setAdminCookie();
    },
    async signOut() {
      await clearAdminCookie();
    },
  },
});
