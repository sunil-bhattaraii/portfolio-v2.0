import React from 'react';
import ResourceManager from '@/components/admin/ResourceManager';
import { ICON_NAMES } from '@/lib/icon-registry';

export const dynamic = 'force-dynamic';

const SkillOptions = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Experienced', label: 'Experienced' },
];

const SkillsAdminPage: React.FC = () => {
  return (
    <ResourceManager
      title="Skills"
      subtitle="Core and secondary skills shown in the skills section."
      apiPath="/api/skills"
      nameField="name"
      subtitleField="level"
      badgeField={{ name: 'highlight', map: { 'true': 'Featured' } }}
      fields={[
        { name: 'name', label: 'Name', type: 'text', required: true },
        {
          name: 'level',
          label: 'Level',
          type: 'select',
          options: SkillOptions,
        },
        {
          name: 'icon',
          label: 'Icon',
          type: 'select',
          options: ICON_NAMES.map((n) => ({ value: n, label: n })),
        },
        { name: 'highlight', label: 'Highlight (featured)', type: 'boolean' },
        {
          name: 'categories',
          label: 'Categories',
          type: 'array',
          hint: 'One per line. e.g. Core, Backend, DevOps',
        },
        { name: 'order', label: 'Order', type: 'number' },
      ]}
    />
  );
};

export default SkillsAdminPage;
