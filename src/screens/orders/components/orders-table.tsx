'use client';

import { type EntityColumn, EntityTable, PaginationControls } from '@/features/crud';
import { useUsers } from '@/screens/users';
import type { Order } from '@/shared/api';
import { useClampPage, useScreenPagination } from '@/shared/lib/hooks';
import { Badge } from '@/shared/ui';
import { usePagedOrders } from '../hooks/queries';
import { orderStatusLabels } from '../statuses';
import { OrderDetails } from './order-details';
import { UpdateOrderStatusDialog } from './update-order-status-dialog';

const costFormatter = new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const OrdersTable = () => {
  const { page, setPage } = useScreenPagination();
  const { data, isLoading } = usePagedOrders(page);
  const { data: users } = useUsers();

  useClampPage(page, setPage, data?.totalPages ?? 0);

  const getUserLabel = (userId: string) => {
    const user = users?.find(user => user.id === userId);
    return user ? user.name : '—';
  };

  const columns: EntityColumn<Order>[] = [
    {
      header: 'Заказ',
      cell: order => <span className='font-mono text-xs'>{order.id.slice(0, 8)}</span>,
    },
    {
      header: 'Пользователь',
      className: 'w-48',
      cell: order => getUserLabel(order.userId),
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
      header: 'Комментарий',
      className: 'max-w-64',
      cellClassName: 'max-w-64',
      cell: order => order.comment ?? '—',
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
      <EntityTable
        items={data?.items ?? []}
        columns={columns}
        getRowKey={order => order.id}
        isLoading={isLoading}
        emptyMessage='Заказы не найдены'
      />
      <PaginationControls
        page={page}
        totalPages={data?.totalPages ?? 0}
        totalCount={data?.totalCount}
        onPageChange={setPage}
      />
    </>
  );
};
