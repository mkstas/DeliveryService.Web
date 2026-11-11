import { ClipboardPenLineIcon } from 'lucide-react';
import { DashboardHeader } from '@/modules/dashboard';
import { SystemSpecificationsActions, SystemSpecificationsTable } from '@/modules/system-specifications';

export default function SpecificationsPage() {
  return (
    <>
      <DashboardHeader title='Характеристики' icon={ClipboardPenLineIcon} />
      <div className='flex flex-col gap-4'>
        <SystemSpecificationsActions />
        <SystemSpecificationsTable />
      </div>
    </>
  );
}
