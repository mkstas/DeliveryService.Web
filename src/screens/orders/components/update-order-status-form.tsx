'use client';

import {
  clearServerErrors,
  FormShell,
  getServerErrorMessage,
  SelectField,
  setServerError,
  SubmitButton,
} from '@/features/form';
import type { Order } from '@/shared/api';
import { FieldGroup } from '@/shared/ui';
import { type FC } from 'react';
import { ClipboardListIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { useUpdateOrderStatus } from '../hooks/mutations';
import { orderStatusOptions } from '../statuses';

const orderStatusFormSchema = z.object({
  status: z.string().min(1, 'Выберите статус'),
});

type UpdateOrderStatusFormProps = {
  order: Order;
  onSuccess?: () => void;
};

export const UpdateOrderStatusForm: FC<UpdateOrderStatusFormProps> = ({ order, onSuccess }) => {
  const updateStatus = useUpdateOrderStatus();

  const options = orderStatusOptions.some(option => option.value === order.status)
    ? orderStatusOptions
    : [{ value: order.status, label: order.status }, ...orderStatusOptions];

  const form = useForm({
    defaultValues: { status: order.status },
    validators: {
      onChange: orderStatusFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['status']);

      try {
        await updateStatus.mutateAsync({ id: order.id, status: value.status });
        onSuccess?.();
      } catch (error) {
        setServerError(form, 'status', getServerErrorMessage(error, {}, 'Не удалось изменить статус заказа'));
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup>
        <SelectField
          form={form}
          name='status'
          label='Статус'
          icon={ClipboardListIcon}
          options={options}
          placeholder='Выберите статус'
        />
        <SubmitButton form={form} className='w-full'>
          Изменить статус
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
