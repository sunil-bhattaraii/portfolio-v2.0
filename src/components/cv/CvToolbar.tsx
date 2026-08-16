'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer } from 'lucide-react';

const CvToolbar: React.FC = () => (
  <div className="cv-toolbar">
    <div className="cv-toolbar-inner">
      <Link href="/" className="cv-toolbar-btn cv-toolbar-back">
        <ArrowLeft size={16} />
        <span>Back to portfolio</span>
      </Link>
      <div className="cv-toolbar-right">
        <span className="cv-toolbar-hint">
          Tip: choose &ldquo;Save as PDF&rdquo; as the destination
        </span>
        <button
          type="button"
          onClick={() => window.print()}
          className="cv-toolbar-btn cv-toolbar-print"
        >
          <Printer size={16} />
          <span>Print / Save as PDF</span>
        </button>
      </div>
    </div>
  </div>
);

export default CvToolbar;
