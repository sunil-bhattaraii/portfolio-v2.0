import React from 'react';
import SiteConfigForm from '@/components/admin/SiteConfigForm';
import { fetchAdmin } from '@/lib/api';
import type { SiteConfigData } from '@/types';

export const dynamic = 'force-dynamic';

const SiteConfigPage: React.FC = async () => {
  const config = await fetchAdmin<SiteConfigData>('/api/site-config');

  return <SiteConfigForm config={config} />;
};

export default SiteConfigPage;
