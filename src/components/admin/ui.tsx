import React from 'react';
import { Loader2 } from 'lucide-react';

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export const inputClass =
  'w-full px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors';

export const labelClass =
  'block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5';

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1">
      <label className={labelClass}>{label}</label>
      {children}
      {hint && <p className="text-[11px] text-zinc-600">{hint}</p>}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClass, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(inputClass, 'resize-y', props.className)}
    />
  );
}

export function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement>
) {
  return (
    <select {...props} className={cn(inputClass, 'cursor-pointer', props.className)} />
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none py-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-white/10 bg-zinc-950 accent-sky-500"
      />
      <span className="text-sm text-zinc-300">{label}</span>
    </label>
  );
}

export function Button({
  variant = 'primary',
  icon,
  label,
  loading = false,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  icon?: React.ReactNode;
  label?: string;
  loading?: boolean;
}) {
  const styles = {
    primary:
      'bg-sky-600 hover:bg-sky-500 text-white disabled:bg-zinc-700 disabled:cursor-not-allowed',
    secondary:
      'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10',
    danger: 'bg-red-600/90 hover:bg-red-500 text-white',
    ghost: 'bg-transparent hover:bg-white/5 text-zinc-300 border border-transparent',
  };
  return (
    <button
      aria-label={label && icon ? label : undefined}
      {...props}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-60',
        styles[variant],
        className
      )}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin shrink-0" />
      ) : (
        icon
      )}
      {label && (
        <span className={cn(Boolean(icon) && 'hidden sm:inline')}>{label}</span>
      )}
    </button>
  );
}

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'bg-zinc-900/40 border border-white/5 rounded-2xl',
        className
      )}
    />
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-zinc-500 mt-1 font-medium">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
