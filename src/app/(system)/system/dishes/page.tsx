import { SoupIcon } from 'lucide-react';
import { DashboardHeader } from '@/modules/dashboard';
import { SystemDishesActions, SystemDishesTable } from '@/modules/system-dishes';

export default function DishesPage() {
  return (
    <>
      <DashboardHeader title='Блюда' icon={SoupIcon} />
      <div className='flex flex-col gap-4'>
        <SystemDishesActions />
        <SystemDishesTable />
      </div>
    </>
  );
}
