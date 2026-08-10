export const DEFAULT_AI_MODEL = 'meta/llama-3.1-8b-instruct';

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
    value: 'meta/llama-3.1-8b-instruct',
    label: 'Llama 3.1 8B',
    hint: 'Fast — the current default',
  },
  {
    value: 'meta/llama-3.3-70b-instruct',
    label: 'Llama 3.3 70B',
    hint: 'Recommended — smart and reliable tool use',
  },
  {
    value: 'meta/llama-3.1-70b-instruct',
    label: 'Llama 3.1 70B',
  },
  {
    value: 'nvidia/llama-3.1-nemotron-70b-instruct',
    label: 'Nemotron 70B',
  },
  {
    value: 'nvidia/llama-3.1-nemotron-51b-instruct',
    label: 'Nemotron 51B',
  },
  {
    value: 'nvidia/llama-3.1-nemotron-ultra-253b-v1',
    label: 'Nemotron Ultra 253B',
  },
  {
    value: 'nvidia/nemotron-4-340b-instruct',
    label: 'Nemotron 4 340B',
  },
  {
    value: 'mistralai/mistral-large-2-instruct',
    label: 'Mistral Large 2',
  },
  {
    value: 'mistralai/mixtral-8x22b-v0.1',
    label: 'Mixtral 8x22B',
  },
];
