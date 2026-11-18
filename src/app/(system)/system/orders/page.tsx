import { ClipboardListIcon } from 'lucide-react';
import { DashboardHeader } from '@/modules/dashboard';
import { SystemOrdersTable } from '@/modules/system-orders';

export default function OrdersPage() {
  return (
    <>
      <DashboardHeader title='Заказы' icon={ClipboardListIcon} />
      <div className='flex flex-col gap-4'>
        <SystemOrdersTable />
      </div>
    </>
  );
}
