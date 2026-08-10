import React from 'react';
import ResourceManager from '@/components/admin/ResourceManager';

export const dynamic = 'force-dynamic';

const StatusOptions = [
  { value: 'Completed', label: 'Completed' },
  { value: 'Ongoing', label: 'Ongoing' },
];

const ProjectsAdminPage: React.FC = () => {
  return (
    <ResourceManager
      title="Projects"
      subtitle="Projects rendered in the projects grid and modal."
      apiPath="/api/projects"
      nameField="title"
      subtitleField="status"
      badgeField={{ name: 'status', map: { Completed: 'Completed', Ongoing: 'Ongoing' } }}
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        {
          name: 'description',
          label: 'Description',
          type: 'markdown',
          required: true,
        },
        {
          name: 'techStack',
          label: 'Tech Stack',
          type: 'array',
          hint: 'One per line, e.g. Next.js',
        },
        { name: 'imageUrl', label: 'Cover Image', type: 'image' },
        { name: 'githubUrl', label: 'GitHub URL', type: 'url' },
        { name: 'liveUrl', label: 'Live URL', type: 'url' },
        { name: 'status', label: 'Status', type: 'select', options: StatusOptions },
        {
          name: 'showPreview',
          label: 'Show live preview (iframe)',
          type: 'boolean',
          hint: 'If off, the cover image is shown instead. Some sites block embedding.',
        },
        {
          name: 'fullDetails',
          label: 'Full Details',
          type: 'markdown',
          hint: 'Shown on the project page.',
        },
        { name: 'order', label: 'Order', type: 'number' },
      ]}
    />
  );
};

export default ProjectsAdminPage;
