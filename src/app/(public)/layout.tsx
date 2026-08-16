import React from 'react';
import Header from '@/components/Header';
import AIAssistant from '@/components/AIAssistant';
import PrintShortcut from '@/components/cv/PrintShortcut';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="grow">{children}</div>
      <AIAssistant />
      <PrintShortcut />
    </>
  );
}
