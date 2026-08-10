import React from 'react';
import ResourceManager from '@/components/admin/ResourceManager';

export const dynamic = 'force-dynamic';

const TypeOptions = [
  { value: 'degree', label: 'Degree' },
  { value: 'certification', label: 'Certification' },
];

const QualificationsAdminPage: React.FC = () => {
  return (
    <ResourceManager
      title="Qualifications"
      subtitle="Degrees and certifications in the qualifications section."
      apiPath="/api/qualifications"
      nameField="title"
      subtitleField="year"
      badgeField={{ name: 'type', map: { degree: 'Degree', certification: 'Cert' } }}
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'institute', label: 'Institute', type: 'text', required: true },
        { name: 'year', label: 'Year', type: 'text', required: true },
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          options: TypeOptions,
        },
        { name: 'details', label: 'Details', type: 'markdown' },
        { name: 'order', label: 'Order', type: 'number' },
      ]}
    />
  );
};

export default QualificationsAdminPage;
