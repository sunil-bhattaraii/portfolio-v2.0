import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import InteractiveBackground from '../components/InteractiveBackground';
import AIAssistant from '../components/AIAssistant';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
    url: 'https://www.sunil-bhattarai.com.np',
    siteName: 'Sunil Bhattarai',
    title: 'Sunil Bhattarai — Personal Portfolio',
    description:
      'Fullstack developer crafting scalable systems and polished interfaces. Based in Kathmandu, Nepal.',
    images: [
      {
        url: 'https://www.sunil-bhattarai.com.np/heroImage.webp',
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
    images: ['https://www.sunil-bhattarai.com.np/heroImage.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.png',
  },
  alternates: {
    canonical: 'https://www.sunil-bhattarai.com.np',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://www.sunil-bhattarai.com.np/#person',
      name: 'Sunil Bhattarai',
      url: 'https://www.sunil-bhattarai.com.np',
      image: 'https://www.sunil-bhattarai.com.np/heroImage.webp',
      jobTitle: 'Fullstack Software Developer',
      description:
        'Fullstack software developer based in Kathmandu, Nepal. Specialising in React, Next.js, Node.js, and scalable system design.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressCountry: 'NP',
      },
      knowsAbout: [
        'React',
        'Next.js',
        'Node.js',
        'TypeScript',
        'Go',
        'PostgreSQL',
        'Kubernetes',
        'AWS',
        'System Design',
      ],
      sameAs: [
        'https://github.com',
        'https://linkedin.com',
        'https://leetcode.com',
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Fullstack Software Developer',
        occupationLocation: {
          '@type': 'City',
          name: 'Kathmandu',
        },
        skills: 'React, Next.js, Node.js, TypeScript, Go, PostgreSQL',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.sunil-bhattarai.com.np/#website',
      url: 'https://www.sunil-bhattarai.com.np',
      name: 'Sunil Bhattarai — Personal Portfolio',
      description:
        'Portfolio of Sunil Bhattarai, a fullstack software developer based in Kathmandu, Nepal.',
      author: { '@id': 'https://www.sunil-bhattarai.com.np/#person' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://www.sunil-bhattarai.com.np/#profilepage',
      url: 'https://www.sunil-bhattarai.com.np',
      name: 'Sunil Bhattarai — Personal Portfolio',
      about: { '@id': 'https://www.sunil-bhattarai.com.np/#person' },
      mainEntity: { '@id': 'https://www.sunil-bhattarai.com.np/#person' },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
