import React from 'react';
import ResourceManager from '@/components/admin/ResourceManager';

export const dynamic = 'force-dynamic';

const AllowlistAdminPage: React.FC = () => {
  return (
    <ResourceManager
      title="Allowlist"
      subtitle="GitHub accounts whose email is in this list can sign in to the admin panel."
      apiPath="/api/allowlist"
      nameField="email"
      fields={[
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          required: true,
          placeholder: 'you@example.com',
          hint: 'Lowercase. Only allowlisted emails can log in via GitHub.',
        },
      ]}
    />
  );
};

export default AllowlistAdminPage;
