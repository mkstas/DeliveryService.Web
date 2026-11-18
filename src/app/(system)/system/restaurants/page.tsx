import { MapPinIcon } from 'lucide-react';
import { DashboardHeader } from '@/modules/dashboard';
import { SystemRestaurantsActions, SystemRestaurantsTable } from '@/modules/system-restaurants';

export default function RestaurantsPage() {
  return (
    <>
      <DashboardHeader title='Рестораны' icon={MapPinIcon} />
      <div className='flex flex-col gap-4'>
        <SystemRestaurantsActions />
        <SystemRestaurantsTable />
      </div>
    </>
  );
}
