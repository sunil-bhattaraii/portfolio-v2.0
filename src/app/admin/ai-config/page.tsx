import React from 'react';
import AIConfigForm from '@/components/admin/AIConfigForm';
import { getAIStoredInstruction, getAIStoredModel } from '@/lib/queries';
import { DEFAULT_AI_INSTRUCTION } from '@/lib/ai-instruction';

export const dynamic = 'force-dynamic';

const AIConfigPage: React.FC = async () => {
  const [stored, storedModel] = await Promise.all([
    getAIStoredInstruction(),
    getAIStoredModel(),
  ]);

  return (
    <AIConfigForm
      initial={stored}
      defaultInstruction={DEFAULT_AI_INSTRUCTION}
      initialModel={storedModel}
    />
  );
};

export default AIConfigPage;
