import React from 'react';
import AIConfigForm from '@/components/admin/AIConfigForm';
import { getAIStoredInstruction } from '@/lib/queries';
import { DEFAULT_AI_INSTRUCTION } from '@/lib/ai-instruction';

export const dynamic = 'force-dynamic';

const AIConfigPage: React.FC = async () => {
  const stored = await getAIStoredInstruction();

  return (
    <AIConfigForm initial={stored} defaultInstruction={DEFAULT_AI_INSTRUCTION} />
  );
};

export default AIConfigPage;
