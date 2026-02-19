import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
import Header from '../components/Header';
import InteractiveBackground from '../components/InteractiveBackground';
import AIAssistant from '../components/AIAssistant';

export const metadata: Metadata = {
  title: 'Sunil Bhattarai — Personal Portfolio',
  description:
    'Portfolio of Sunil Bhattarai, a fullstack software developer based in Kathmandu, Nepal. Specialising in React, Next.js, Node.js, and scalable system design.',
  keywords: [
    'Sunil Bhattarai',
    'Fullstack Developer',
    'Software Engineer',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'Kathmandu',
    'Nepal',
    'Portfolio',
  ],
  authors: [{ name: 'Sunil Bhattarai' }],
  creator: 'Sunil Bhattarai',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sunil-bhattarai.vercel.app',
    siteName: 'Sunil Bhattarai',
    title: 'Sunil Bhattarai — Personal Portfolio',
    description:
      'Fullstack developer crafting scalable systems and polished interfaces. Based in Kathmandu, Nepal.',
    images: [
      {
        url: 'https://sunil-bhattarai.vercel.app/heroImage.webp',
        width: 1200,
        height: 630,
        alt: 'Sunil Bhattarai — Fullstack Software Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunil Bhattarai — Personal Portfolio',
    description:
      'Fullstack developer crafting scalable systems and polished interfaces. Based in Kathmandu, Nepal.',
    images: ['https://sunil-bhattarai.vercel.app/heroImage.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased`}>
      <body>
        <div className="relative min-h-screen text-[#f4f4f5]">
          <div className="fixed inset-0 z-0">
            <InteractiveBackground />
          </div>

          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <div className="grow">{children}</div>
            <AIAssistant />
          </div>
        </div>
      </body>
    </html>
  );
}
