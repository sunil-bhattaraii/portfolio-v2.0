import React from 'react';
import ResourceManager from '@/components/admin/ResourceManager';
import { SOCIAL_PLATFORMS } from '@/lib/icon-registry';

export const dynamic = 'force-dynamic';

const PLATFORM_OPTIONS = SOCIAL_PLATFORMS.map((p) => ({ value: p.platform, label: p.label }));

const SocialsAdminPage: React.FC = () => {
  return (
    <ResourceManager
      title="Socials"
      subtitle="Social links shown in the hero and contact sections."
      apiPath="/api/socials"
      nameField="label"
      subtitleField="href"
      fields={[
        {
          name: 'platform',
          label: 'Platform',
          type: 'select',
          options: PLATFORM_OPTIONS,
          required: true,
        },
        { name: 'label', label: 'Label', type: 'text' },
        { name: 'href', label: 'URL', type: 'url', required: true },
        { name: 'order', label: 'Order', type: 'number' },
        { name: 'showInHero', label: 'Show in hero', type: 'boolean' },
        { name: 'showInContact', label: 'Show in contact', type: 'boolean' },
      ]}
    />
  );
};

export default SocialsAdminPage;
