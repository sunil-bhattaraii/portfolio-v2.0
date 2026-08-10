'use client';

import React, { useState } from 'react';
import { Field, Textarea, cn } from './ui';
import MarkdownContent from '../MarkdownContent';

interface MarkdownFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
}

const MarkdownField: React.FC<MarkdownFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  hint,
}) => {
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  return (
    <Field label={label} hint={hint}>
      <div className="border border-white/10 rounded-lg overflow-hidden bg-zinc-950/40">
        <div className="flex border-b border-white/10 bg-zinc-950/60">
          {(['write', 'preview'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                'px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors',
                tab === t
                  ? 'text-sky-400 border-b-2 border-sky-500'
                  : 'text-zinc-500 hover:text-zinc-300 border-b-2 border-transparent'
              )}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === 'write' ? (
          <Textarea
            rows={8}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder ?? 'Write markdown…'}
            className="border-0 rounded-none resize-y font-mono text-xs leading-relaxed bg-transparent"
          />
        ) : (
          <div className="p-4 min-h-[160px]">
            {value.trim() ? (
              <MarkdownContent content={value} className="space-y-3" />
            ) : (
              <p className="text-sm text-zinc-600">Nothing to preview yet.</p>
            )}
          </div>
        )}
      </div>
    </Field>
  );
};

export default MarkdownField;
