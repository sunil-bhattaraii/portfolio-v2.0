import React from 'react';
import Link from 'next/link';
import { FileDown } from 'lucide-react';

interface PrintCvButtonProps {
  onNavigate?: () => void;
  className?: string;
}

const PrintCvButton: React.FC<PrintCvButtonProps> = ({
  onNavigate,
  className = '',
}) => (
  <Link
    href="/cv"
    onClick={onNavigate}
    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-500 hover:text-white transition-all text-sm font-bold border border-zinc-800 hover:border-zinc-700 ${className}`}
  >
    <FileDown size={14} className="shrink-0 text-sky-500" />
    Print CV
  </Link>
);

export default PrintCvButton;
