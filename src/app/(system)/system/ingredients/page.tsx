import { LeafyGreenIcon } from 'lucide-react';
import { DashboardHeader } from '@/modules/dashboard';
import { SystemIngredientsActions, SystemIngredientsTable } from '@/modules/system-ingredients';

export default function IngredientsPage() {
  return (
    <>
      <DashboardHeader title='Ингредиенты' icon={LeafyGreenIcon} />
      <div className='flex flex-col gap-4'>
        <SystemIngredientsActions />
        <SystemIngredientsTable />
      </div>
    </>
  );
}
