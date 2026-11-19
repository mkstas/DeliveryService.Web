'use client';

import { type EntityColumn, EntityTable } from '@/features/crud';
import { ScreenHeader } from '@/screens/dashboard';
import { OrderDetails } from '@/screens/orders/components/order-details';
import { UpdateOrderStatusDialog } from '@/screens/orders/components/update-order-status-dialog';
import { orderStatusLabels } from '@/screens/orders/statuses';
import type { Order } from '@/shared/api';
import { Badge } from '@/shared/ui';
import { type FC } from 'react';
import { ClipboardListIcon } from 'lucide-react';
import { useMyRestaurantOrders } from '../hooks/queries';

const costFormatter = new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const OrdersTable: FC = () => {
  const { data: orders, isLoading } = useMyRestaurantOrders();

  const columns: EntityColumn<Order>[] = [
    {
      header: 'Заказ',
      cell: order => <span className='font-mono text-xs'>{order.id.slice(0, 8)}</span>,
    },
    {
      header: 'Статус',
      cell: order => <Badge variant='secondary'>{orderStatusLabels[order.status] ?? order.status}</Badge>,
    },
    {
      header: 'Адрес',
      cell: order => order.address,
    },
    {
      header: 'Стоимость',
      cell: order => costFormatter.format(order.cost),
    },
    {
      header: 'Состав',
      cell: order => <OrderDetails details={order.details} />,
    },
    {
      header: 'Действия',
      className: 'text-right',
      cellClassName: 'flex justify-end gap-2',
      cell: order => <UpdateOrderStatusDialog order={order} />,
    },
  ];

  return (
    <>
      <ScreenHeader title='Заказы' icon={ClipboardListIcon} />
      <p className='text-sm text-muted-foreground'>Заказы, содержащие блюда вашего заведения.</p>
      <EntityTable
        items={orders ?? []}
        columns={columns}
        getRowKey={order => order.id}
        isLoading={isLoading}
        emptyMessage='Заказы не найдены'
      />
    </>
  );
};
