'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

interface AdminShieldProps {
  isAdmin?: boolean;
}

const AdminShield: React.FC<AdminShieldProps> = ({ isAdmin }) => {
  if (!isAdmin) return null;

  return (
    <Link
      href="/admin"
      title="Admin panel"
      aria-label="Admin panel"
      className="p-2 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all"
    >
      <ShieldCheck size={20} className="drop-shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
    </Link>
  );
};

export default AdminShield;
