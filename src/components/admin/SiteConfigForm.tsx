'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Check } from 'lucide-react';
import { Field, Input, Textarea, Select, Button, Card, PageHeader } from './ui';
import { ICON_NAMES } from '@/lib/icon-registry';
import type { SiteConfigData } from '@/types';

interface SiteConfigFormProps {
  config: SiteConfigData | null;
}

const DEFAULT_CONFIG: SiteConfigData = {
  hero: { name: '', role: '' },
  about: { intro: [], facts: [], hobbies: [] },
  contact: { email: '', phone: '', location: '' },
  version: '',
};

const SiteConfigForm: React.FC<SiteConfigFormProps> = ({ config }) => {
  const router = useRouter();
  const [form, setForm] = useState<SiteConfigData>(config ?? DEFAULT_CONFIG);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  const patch = (patch: Partial<SiteConfigData>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const patchHero = (key: keyof SiteConfigData['hero'], value: string) =>
    setForm((prev) => ({ ...prev, hero: { ...prev.hero, [key]: value } }));

  const patchContact = (key: keyof SiteConfigData['contact'], value: string) =>
    setForm((prev) => ({ ...prev, contact: { ...prev.contact, [key]: value } }));

  const setIntro = (text: string) =>
    patch({
      about: {
        ...form.about,
        intro: text
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      },
    });

  const setFact = (index: number, key: 'icon' | 'label' | 'value', value: string) => {
    const facts = form.about.facts.map((f, i) =>
      i === index ? { ...f, [key]: value } : f
    );
    patch({ about: { ...form.about, facts } });
  };

  const setHobby = (index: number, key: 'icon' | 'title', value: string) => {
    const hobbies = form.about.hobbies.map((h, i) =>
      i === index ? { ...h, [key]: value } : h
    );
    patch({ about: { ...form.about, hobbies } });
  };

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/site-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: json.error ?? 'Save failed' });
        return;
      }
      setMessage({ type: 'ok', text: 'Saved. The public site has been updated.' });
      router.refresh();
    } catch {
      setMessage({ type: 'error', text: 'Save failed — network error' });
    } finally {
      setSaving(false);
    }
  };

  const iconOptions = ICON_NAMES.map((n) => ({ value: n, label: n }));

  return (
    <div>
      <PageHeader
        title="Site Config"
        subtitle="Hero, about, and contact text shown across the site."
      />

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg text-sm border ${
            message.type === 'ok'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {/* Hero */}
        <Card className="p-6 md:p-8">
          <h2 className="text-sm font-black text-white uppercase tracking-widest mb-6 text-sky-500">
            Hero Section
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Name">
              <Input
                value={form.hero.name}
                onChange={(e) => patchHero('name', e.target.value)}
                placeholder="Sunil Bhattarai"
              />
            </Field>
            <Field label="Role tagline">
              <Input
                value={form.hero.role}
                onChange={(e) => patchHero('role', e.target.value)}
                placeholder="Fullstack Software Developer"
              />
            </Field>
          </div>
        </Card>

        {/* About */}
        <Card className="p-6 md:p-8">
          <h2 className="text-sm font-black text-white uppercase tracking-widest mb-6 text-sky-500">
            About Section
          </h2>
          <div className="space-y-6">
            <Field label="Intro paragraphs" hint="One paragraph per line.">
              <Textarea
                rows={5}
                value={form.about.intro.join('\n')}
                onChange={(e) => setIntro(e.target.value)}
              />
            </Field>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Quick facts
                </span>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      about: {
                        ...prev.about,
                        facts: [...prev.about.facts, { icon: 'Star', label: '', value: '' }],
                      },
                    }))
                  }
                  icon={<Plus size={14} />}
                  label="Add fact"
                />
              </div>
              <div className="space-y-3">
                {form.about.facts.length === 0 && (
                  <p className="text-sm text-zinc-600">No facts yet.</p>
                )}
                {form.about.facts.map((fact, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <Select
                      value={fact.icon}
                      onChange={(e) => setFact(i, 'icon', e.target.value)}
                      className="w-36"
                    >
                      {iconOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </Select>
                    <Input
                      value={fact.label}
                      onChange={(e) => setFact(i, 'label', e.target.value)}
                      placeholder="Label (e.g. Based in)"
                      className="flex-1"
                    />
                    <Input
                      value={fact.value}
                      onChange={(e) => setFact(i, 'value', e.target.value)}
                      placeholder="Value (e.g. Kathmandu, Nepal)"
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          about: {
                            ...prev.about,
                            facts: prev.about.facts.filter((_, j) => j !== i),
                          },
                        }))
                      }
                      aria-label="Remove fact"
                      icon={<Trash2 size={16} className="text-red-400" />}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Hobbies
                </span>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      about: {
                        ...prev.about,
                        hobbies: [...prev.about.hobbies, { icon: 'Music', title: '' }],
                      },
                    }))
                  }
                  icon={<Plus size={14} />}
                  label="Add hobby"
                />
              </div>
              <div className="space-y-3">
                {form.about.hobbies.length === 0 && (
                  <p className="text-sm text-zinc-600">No hobbies yet.</p>
                )}
                {form.about.hobbies.map((hobby, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <Select
                      value={hobby.icon}
                      onChange={(e) => setHobby(i, 'icon', e.target.value)}
                      className="w-36"
                    >
                      {iconOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </Select>
                    <Input
                      value={hobby.title}
                      onChange={(e) => setHobby(i, 'title', e.target.value)}
                      placeholder="Hobby (e.g. Chess)"
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          about: {
                            ...prev.about,
                            hobbies: prev.about.hobbies.filter((_, j) => j !== i),
                          },
                        }))
                      }
                      aria-label="Remove hobby"
                      icon={<Trash2 size={16} className="text-red-400" />}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Contact */}
        <Card className="p-6 md:p-8">
          <h2 className="text-sm font-black text-white uppercase tracking-widest mb-6 text-sky-500">
            Contact Section
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Email">
              <Input
                type="email"
                value={form.contact.email}
                onChange={(e) => patchContact('email', e.target.value)}
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Phone">
              <Input
                value={form.contact.phone}
                onChange={(e) => patchContact('phone', e.target.value)}
                placeholder="+977-…"
              />
            </Field>
            <Field label="Location">
              <Input
                value={form.contact.location}
                onChange={(e) => patchContact('location', e.target.value)}
                placeholder="Kathmandu, Nepal"
              />
            </Field>
            <Field label="Footer version">
              <Input
                value={form.version}
                onChange={(e) => patch({ version: e.target.value })}
                placeholder="v1.4.2"
              />
            </Field>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button
            onClick={save}
            disabled={saving}
            loading={saving}
            icon={<Check size={16} />}
            label="Save Changes"
          />
        </div>
      </div>
    </div>
  );
};

export default SiteConfigForm;
