import { MapPinIcon } from 'lucide-react';
import { DashboardHeader } from '@/modules/dashboard';
import { SystemEstablishmentsActions, SystemEstablishmentsTable } from '@/modules/system-establishments';

export default function EstablishmentsPage() {
  return (
    <>
      <DashboardHeader title='Заведения' icon={MapPinIcon} />
      <div className='flex flex-col gap-4'>
        <SystemEstablishmentsActions />
        <SystemEstablishmentsTable />
      </div>
    </>
  );
}
