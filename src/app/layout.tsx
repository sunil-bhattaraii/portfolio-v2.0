import React from 'react';
import './globals.css';
import Header from '../components/Header';
import InteractiveBackground from '../components/InteractiveBackground';
import AIAssistant from '../components/AIAssistant';

/**
 * RootLayout: The main shell of the application.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen bg-[#ffffff] text-[#f4f4f5]">
          {/* Background layer */}
          <div className="fixed inset-0 z-0">
            <InteractiveBackground />
          </div>

          {/* Content layer */}
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
