export const DEFAULT_AI_MODEL = 'nvidia/nvidia-nemotron-nano-9b-v2';

export const CUSTOM_MODEL_VALUE = '__custom';

export interface AIModelOption {
  value: string;
  label: string;
  hint?: string;
}

/**
 * Curated chat models served by the NVIDIA NIM endpoint. The admin can pick
 * one in the AI Persona settings, or enter a custom model id.
 */
export const AI_MODEL_OPTIONS: AIModelOption[] = [
  {
    value: 'nvidia/nvidia-nemotron-nano-9b-v2',
    label: 'Nemotron Nano 9B v2',
    hint: 'Fast and reliable, large context — the current default',
  },
  {
    value: 'nvidia/nemotron-mini-4b-instruct',
    label: 'Nemotron Mini 4B',
    hint: 'Fast, but max context is only 4096 tokens',
  },
  {
    value: 'meta/llama-3.1-8b-instruct',
    label: 'Llama 3.1 8B',
    hint: 'Can be overloaded / slow on the free tier',
  },
  {
    value: 'meta/llama-3.3-70b-instruct',
    label: 'Llama 3.3 70B',
    hint: 'Smart tool use, but can be overloaded on the free tier',
  },
  {
    value: 'meta/llama-3.1-70b-instruct',
    label: 'Llama 3.1 70B',
    hint: 'Works but slow (~18s per reply)',
  },
];
