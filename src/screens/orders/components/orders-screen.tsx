'use client';

import { ScreenHeader } from '@/screens/dashboard';
import { ClipboardListIcon } from 'lucide-react';
import { OrdersTable } from './orders-table';

export const OrdersScreen = () => {
  return (
    <>
      <ScreenHeader title='Заказы' icon={ClipboardListIcon} />
      <div className='flex flex-col gap-4'>
        <OrdersTable />
      </div>
    </>
  );
};
