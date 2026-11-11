import { LayoutGridCirclesIcon } from 'lucide-react';
import { DashboardHeader } from '@/modules/dashboard';
import { SystemCategoriesActions, SystemCategoriesTable } from '@/modules/system-categories';

export default function CategoriesPage() {
  return (
    <>
      <DashboardHeader title='Категории' icon={LayoutGridCirclesIcon} />
      <div className='flex flex-col gap-4'>
        <SystemCategoriesActions />
        <SystemCategoriesTable />
      </div>
    </>
  );
}
