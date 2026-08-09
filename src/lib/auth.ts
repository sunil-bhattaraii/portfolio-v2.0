import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { dbConnect } from './db';
import { AllowlistModel } from '../models/Allowlist';

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
});
