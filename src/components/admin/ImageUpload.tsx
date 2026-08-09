'use client';

import React, { useRef, useState } from 'react';
import { Loader2, ImagePlus, Trash2 } from 'lucide-react';
import { Field, Input, Button } from './ui';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
}

function fileToResizedDataUrl(file: File, maxWidth = 1280, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas not supported'));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/webp', quality));
      };
      img.onerror = () => reject(new Error('Could not read image'));
      img.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, value, onChange, hint }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError('');
    setUploading(true);
    try {
      const dataUrl = await fileToResizedDataUrl(file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Upload failed');
      onChange(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <Field label={label} hint={hint}>
        <div className="flex flex-col gap-3">
          {value ? (
            <div className="relative w-full max-w-sm aspect-video overflow-hidden rounded-lg border border-white/10 bg-zinc-950 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => inputRef.current?.click()}
                >
                  Replace
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => onChange('')}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="w-full max-w-sm aspect-video rounded-lg border border-dashed border-white/15 bg-zinc-950 flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-sky-500 hover:border-sky-500/40 transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <ImagePlus size={20} />
              )}
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {uploading ? 'Uploading…' : 'Click to upload'}
              </span>
            </button>
          )}
        </div>
      </Field>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <div className="max-w-sm">
        <Input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="…or paste an image URL"
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default ImageUpload;
