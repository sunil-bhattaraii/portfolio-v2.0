import React from 'react';
import ResourceManager from '@/components/admin/ResourceManager';

export const dynamic = 'force-dynamic';

const ExperienceAdminPage: React.FC = () => {
  return (
    <ResourceManager
      title="Experience"
      subtitle="Work / project experiences shown in the experience section."
      apiPath="/api/experience"
      nameField="role"
      subtitleField="company"
      fields={[
        { name: 'role', label: 'Role', type: 'text', required: true },
        { name: 'company', label: 'Company', type: 'text', required: true },
        { name: 'duration', label: 'Duration', type: 'text', required: true },
        {
          name: 'description',
          label: 'Description',
          type: 'array',
          hint: 'One bullet point per line.',
        },
        {
          name: 'skills',
          label: 'Skills',
          type: 'array',
          hint: 'One per line, e.g. TypeScript',
        },
        { name: 'order', label: 'Order', type: 'number' },
      ]}
    />
  );
};

export default ExperienceAdminPage;
