'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save, RotateCcw, Eraser, Sparkles } from 'lucide-react';
import {
  Card,
  PageHeader,
  Field,
  Textarea,
  Select,
  Input,
  Button,
} from './ui';
import {
  AI_MODEL_OPTIONS,
  CUSTOM_MODEL_VALUE,
  DEFAULT_AI_MODEL,
} from '@/lib/ai-models';

interface AIConfigFormProps {
  initial: string;
  defaultInstruction: string;
  initialModel: string;
}

const AIConfigForm: React.FC<AIConfigFormProps> = ({
  initial,
  defaultInstruction,
  initialModel,
}) => {
  const router = useRouter();
  const [value, setValue] = useState(initial || defaultInstruction);
  const [model, setModel] = useState(initialModel);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: 'ok' | 'error';
    text: string;
  } | null>(null);

  const isKnownModel = AI_MODEL_OPTIONS.some((o) => o.value === model);
  const [selectValue, setSelectValue] = useState(
    isKnownModel ? model : model ? CUSTOM_MODEL_VALUE : ''
  );
  const [customModel, setCustomModel] = useState(
    isKnownModel ? '' : model
  );
  const effectiveModel = selectValue === CUSTOM_MODEL_VALUE ? customModel : selectValue;

  const save = async (text: string) => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/ai-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction: text, model: effectiveModel }),
      });
      const json = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: json.error ?? 'Save failed' });
        return;
      }
      setModel(effectiveModel);
      setMessage({
        type: 'ok',
        text: 'Saved. New messages will use this instruction and model.',
      });
      router.refresh();
    } catch {
      setMessage({ type: 'error', text: 'Save failed — network error' });
    } finally {
      setSaving(false);
    }
  };

  const resetModel = () => {
    setSelectValue('');
    setCustomModel('');
  };

  return (
    <div>
      <PageHeader
        title="AI Persona"
        subtitle="The instruction that tells the AI assistant how to behave, and the model it runs on. Combined with the live portfolio context on every chat message."
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

      <Card className="p-6 md:p-8 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-sky-500" />
          <h2 className="text-sm font-black text-white uppercase tracking-widest text-sky-500">
            Model
          </h2>
        </div>

        <Field
          label="AI model"
          hint="Leave empty to use the environment default. Bigger models are smarter but slower. Changes apply to new chat messages immediately."
        >
          <Select
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            className="mb-3"
          >
            <option value="">
              Default ({DEFAULT_AI_MODEL})
            </option>
            {AI_MODEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
                {option.hint ? ` — ${option.hint}` : ''}
              </option>
            ))}
            <option value={CUSTOM_MODEL_VALUE}>Custom model id…</option>
          </Select>
        </Field>

        {selectValue === CUSTOM_MODEL_VALUE && (
          <Input
            value={customModel}
            onChange={(e) => setCustomModel(e.target.value)}
            placeholder="e.g. meta/llama-3.3-70b-instruct"
            className="font-mono text-xs"
          />
        )}
      </Card>

      <Card className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-sky-500" />
          <h2 className="text-sm font-black text-white uppercase tracking-widest text-sky-500">
            Instruction
          </h2>
        </div>

        <Field
          label="Persona instruction"
          hint="Leave empty to use the built-in default. Changes apply to new chat messages immediately."
        >
          <Textarea
            rows={22}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={defaultInstruction}
            className="font-mono text-xs leading-relaxed"
          />
        </Field>

        <div className="flex flex-wrap gap-3 mt-6">
          <Button onClick={() => save(value)} disabled={saving}>
            {saving ? (
              <Loader2 size={16} className="animate-spin mr-1.5 inline" />
            ) : (
              <Save size={16} className="mr-1.5 inline" />
            )}
            Save
          </Button>

          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              setValue(defaultInstruction);
              setMessage(null);
            }}
          >
            <RotateCcw size={16} className="mr-1.5 inline" />
            Load Default Instruction
          </Button>

          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              setValue('');
              setMessage(null);
            }}
          >
            <Eraser size={16} className="mr-1.5 inline" />
            Clear Instruction (use default)
          </Button>

          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              resetModel();
              setMessage(null);
            }}
          >
            <RotateCcw size={16} className="mr-1.5 inline" />
            Reset Model
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AIConfigForm;
