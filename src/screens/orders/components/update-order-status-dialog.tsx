'use client';

import { FormDialog } from '@/features/form';
import type { Order } from '@/shared/api';
import { PencilIcon } from 'lucide-react';
import { UpdateOrderStatusForm } from './update-order-status-form';

type UpdateOrderStatusDialogProps = {
  order: Order;
};

export const UpdateOrderStatusDialog = ({ order }: UpdateOrderStatusDialogProps) => {
  return (
    <FormDialog
      trigger={{ icon: PencilIcon, variant: 'ghost', ariaLabel: 'Изменить статус заказа' }}
      title='Изменение статуса заказа'
      description={`Заказ ${order.id.slice(0, 8)}`}
    >
      {close => <UpdateOrderStatusForm order={order} onSuccess={close} />}
    </FormDialog>
  );
};
