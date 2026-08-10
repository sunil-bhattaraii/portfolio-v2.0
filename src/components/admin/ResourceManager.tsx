'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Field, Input, Textarea, Select, Checkbox, Button, Card, PageHeader, cn } from './ui';
import ImageUpload from './ImageUpload';
import MarkdownField from './MarkdownField';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'array'
  | 'number'
  | 'select'
  | 'boolean'
  | 'image'
  | 'url'
  | 'markdown';

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  hint?: string;
}

interface ResourceManagerProps {
  title: string;
  subtitle?: string;
  apiPath: string;
  fields: FieldConfig[];
  nameField: string;
  subtitleField?: string;
  defaults?: Record<string, unknown>;
  badgeField?: { name: string; map: Record<string, string> };
}

interface Item extends Record<string, unknown> {
  id?: string;
  _id?: string;
}

function arrayToText(value: unknown): string {
  return Array.isArray(value) ? value.join('\n') : '';
}

function textToArray(text: string): string[] {
  return text
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function valueToString(v: unknown): string {
  if (v === null || v === undefined) return '';
  return String(v);
}

const ResourceManager: React.FC<ResourceManagerProps> = ({
  title,
  subtitle,
  apiPath,
  fields,
  nameField,
  subtitleField,
  defaults,
  badgeField,
}) => {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string | boolean | number>>({});

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(apiPath, { cache: 'no-store' });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError('Failed to load data');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [apiPath]);

  useEffect(() => {
    load();
  }, [load]);

  const openNew = () => {
    const initial: Record<string, string | boolean | number> = {};
    for (const f of fields) {
      if (f.type === 'boolean') initial[f.name] = Boolean(defaults?.[f.name] ?? false);
      else if (f.type === 'number') initial[f.name] = Number(defaults?.[f.name] ?? 0);
      else if (f.type === 'array') initial[f.name] = arrayToText(defaults?.[f.name]);
      else initial[f.name] = valueToString(defaults?.[f.name] ?? '');
    }
    setForm(initial);
    setEditingId(null);
    setFormOpen(true);
    setError('');
  };

  const openEdit = (item: Item) => {
    const initial: Record<string, string | boolean | number> = {};
    for (const f of fields) {
      if (f.type === 'boolean') initial[f.name] = Boolean(item[f.name]);
      else if (f.type === 'number') initial[f.name] = Number(item[f.name] ?? 0);
      else if (f.type === 'array') initial[f.name] = arrayToText(item[f.name]);
      else initial[f.name] = valueToString(item[f.name]);
    }
    setForm(initial);
    setEditingId(item.id ?? item._id ?? null);
    setFormOpen(true);
    setError('');
  };

  const setField = (name: string, value: string | boolean | number) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buildPayload = (): Record<string, unknown> => {
    const payload: Record<string, unknown> = {};
    for (const f of fields) {
      const value = form[f.name];
      if (f.type === 'number') payload[f.name] = Number(value) || 0;
      else if (f.type === 'boolean') payload[f.name] = Boolean(value);
      else if (f.type === 'array') payload[f.name] = textToArray(valueToString(value));
      else payload[f.name] = valueToString(value);
    }
    return payload;
  };

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      const payload = buildPayload();
      const url = editingId ? `${apiPath}/${editingId}` : apiPath;
      const res = await fetch(url, {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Save failed');
        return;
      }
      setFormOpen(false);
      router.refresh();
      await load();
    } catch {
      setError('Save failed — network error');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item: Item) => {
    const id = item.id ?? item._id;
    if (!id) return;
    if (!confirm('Delete this item?')) return;
    setDeletingId(id);
    setError('');
    try {
      const res = await fetch(`${apiPath}/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const json = await res.json();
        setError(json.error ?? 'Delete failed');
        return;
      }
      router.refresh();
      await load();
    } catch {
      setError('Delete failed — network error');
    } finally {
      setDeletingId(null);
    }
  };

  const renderField = (f: FieldConfig) => {
    const value = form[f.name];

    switch (f.type) {
      case 'markdown':
        return (
          <MarkdownField
            label={f.label}
            value={valueToString(value)}
            onChange={(v) => setField(f.name, v)}
            placeholder={f.placeholder}
            hint={f.hint ?? 'Markdown supported (## headings, **bold**, - lists, etc.)'}
          />
        );
      case 'textarea':
        return (
          <Field label={f.label} hint={f.hint}>
            <Textarea
              rows={4}
              value={valueToString(value)}
              onChange={(e) => setField(f.name, e.target.value)}
              placeholder={f.placeholder}
            />
          </Field>
        );
      case 'array':
        return (
          <Field
            label={f.label}
            hint={f.hint ?? 'One item per line (commas also work)'}
          >
            <Textarea
              rows={4}
              value={valueToString(value)}
              onChange={(e) => setField(f.name, e.target.value)}
              placeholder={f.placeholder ?? 'One per line'}
            />
          </Field>
        );
      case 'number':
        return (
          <Field label={f.label} hint={f.hint ?? 'Lower = displayed first'}>
            <Input
              type="number"
              value={Number(value) || 0}
              onChange={(e) => setField(f.name, Number(e.target.value))}
            />
          </Field>
        );
      case 'select':
        return (
          <Field label={f.label}>
            <Select
              value={valueToString(value)}
              onChange={(e) => setField(f.name, e.target.value)}
            >
              {f.options?.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>
        );
      case 'boolean':
        return (
          <Checkbox
            label={f.label}
            checked={Boolean(value)}
            onChange={(v) => setField(f.name, v)}
          />
        );
      case 'image':
        return (
          <ImageUpload
            label={f.label}
            value={valueToString(value)}
            onChange={(url) => setField(f.name, url)}
            hint={f.hint}
          />
        );
      case 'url':
        return (
          <Field label={f.label}>
            <Input
              type="url"
              value={valueToString(value)}
              onChange={(e) => setField(f.name, e.target.value)}
              placeholder={f.placeholder ?? 'https://…'}
            />
          </Field>
        );
      default:
        return (
          <Field label={f.label}>
            <Input
              type="text"
              value={valueToString(value)}
              onChange={(e) => setField(f.name, e.target.value)}
              placeholder={f.placeholder}
            />
          </Field>
        );
    }
  };

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        action={
          !formOpen && (
            <Button onClick={openNew}>
              <Plus size={16} className="mr-1.5 inline" /> New
            </Button>
          )
        }
      />

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
          {error}
        </div>
      )}

      {formOpen && (
        <Card className="p-6 md:p-8 mb-8 border-sky-500/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-white tracking-tight">
              {editingId ? 'Edit' : 'Create'} {title}
            </h2>
            <button
              onClick={() => setFormOpen(false)}
              className="p-2 text-zinc-500 hover:text-white transition-colors"
              aria-label="Close form"
            >
              <X size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fields.map((f) => (
              <div
                key={f.name}
                className={cn(
                  'space-y-2',
                  (f.type === 'textarea' ||
                    f.type === 'array' ||
                    f.type === 'image' ||
                    f.type === 'markdown') &&
                    'md:col-span-2'
                )}
              >
                {renderField(f)}
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <Button onClick={save} disabled={saving}>
              {saving ? (
                <Loader2 size={16} className="animate-spin mr-1.5 inline" />
              ) : (
                <Check size={16} className="mr-1.5 inline" />
              )}
              {editingId ? 'Save Changes' : 'Create'}
            </Button>
            <Button variant="secondary" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-zinc-500">
            <Loader2 size={20} className="animate-spin" /> Loading…
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 text-sm font-medium">
            No {title.toLowerCase()} yet.{' '}
            <button onClick={openNew} className="text-sky-500 hover:underline">
              Create one
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-white/5">
            {items.map((item) => {
              const id = item.id ?? item._id;
              const titleText = valueToString(item[nameField]) || 'Untitled';
              const subtitleText = subtitleField
                ? valueToString(item[subtitleField])
                : '';
              return (
                <li
                  key={String(id)}
                  className="flex items-center justify-between gap-4 px-5 md:px-6 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white truncate">
                        {titleText}
                      </h3>
                      {badgeField && badgeField.map[valueToString(item[badgeField.name])] && (
                        <span
                          className={cn(
                            'shrink-0 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest',
                            valueToString(item[badgeField.name]) === 'Ongoing'
                              ? 'bg-sky-500/15 text-sky-400'
                              : 'bg-emerald-500/15 text-emerald-400'
                          )}
                        >
                          {badgeField.map[valueToString(item[badgeField.name])]}
                        </span>
                      )}
                    </div>
                    {subtitleText && (
                      <p className="text-sm text-zinc-500 truncate mt-0.5">
                        {subtitleText}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="secondary" onClick={() => openEdit(item)}>
                      <Pencil size={14} className="mr-1 inline" /> Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => remove(item)}
                      disabled={deletingId === id}
                    >
                      {deletingId === id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} className="mr-1 inline" />
                      )}
                      Delete
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default ResourceManager;
