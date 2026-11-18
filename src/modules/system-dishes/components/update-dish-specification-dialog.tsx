'use client';

import { type FC } from 'react';
import { PencilIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import type { DishSpecification } from '@/common/api';
import { FieldGroup } from '@/common/components';
import {
  clearServerErrors,
  FormDialog,
  FormShell,
  getServerErrorMessage,
  setServerError,
  SubmitButton,
  TextField,
} from '@/common/forms';
import { useUpdateDishSpecification } from '../hooks/mutations';

const updateSpecificationFormSchema = z.object({
  value: z.string().trim().min(1, 'Значение не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type UpdateSpecificationFormSchema = z.infer<typeof updateSpecificationFormSchema>;

type UpdateSpecificationFormProps = {
  specification: DishSpecification;
  onSuccess?: () => void;
};

const UpdateSpecificationForm: FC<UpdateSpecificationFormProps> = ({ specification, onSuccess }) => {
  const updateDishSpecification = useUpdateDishSpecification();

  const form = useForm({
    defaultValues: {
      value: specification.value,
    } as UpdateSpecificationFormSchema,
    validators: {
      onChange: updateSpecificationFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['value']);

      try {
        await updateDishSpecification.mutateAsync({ id: specification.id, value: value.value.trim() });
        onSuccess?.();
      } catch (error) {
        setServerError(form, 'value', getServerErrorMessage(error, {}, 'Не удалось обновить характеристику'));
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup>
        <TextField form={form} name='value' label='Значение' autoComplete='off' />
        <SubmitButton form={form} className='w-full'>
          Обновить характеристику
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};

type UpdateDishSpecificationDialogProps = {
  specification: DishSpecification;
};

export const UpdateDishSpecificationDialog = ({ specification }: UpdateDishSpecificationDialogProps) => {
  return (
    <FormDialog
      trigger={{ icon: PencilIcon, variant: 'ghost', ariaLabel: 'Редактировать характеристику' }}
      title='Обновление характеристики'
      description='Измените значение характеристики блюда'
    >
      {close => <UpdateSpecificationForm specification={specification} onSuccess={close} />}
    </FormDialog>
  );
};
