'use client';

import { type FC } from 'react';
import { ClipboardPenLine } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { type Specification } from '@/common/api';
import { FieldGroup } from '@/common/components';
import {
  clearServerErrors,
  FormShell,
  getServerErrorMessage,
  setServerError,
  SubmitButton,
  TextField,
} from '@/common/forms';
import { useCreateSpecification, useUpdateSpecification } from '../hooks/mutations';

const specificationFormSchema = z.object({
  name: z.string().trim().min(1, 'Название не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type SpecificationFormSchema = z.infer<typeof specificationFormSchema>;

type SpecificationFormProps = {
  specification?: Specification;
  onSuccess?: () => void;
};

export const SpecificationForm: FC<SpecificationFormProps> = ({ specification, onSuccess }) => {
  const isEdit = specification !== undefined;
  const createSpecification = useCreateSpecification();
  const updateSpecification = useUpdateSpecification();

  const form = useForm({
    defaultValues: {
      name: specification?.name ?? '',
    } as SpecificationFormSchema,
    validators: {
      onChange: specificationFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['name']);

      try {
        if (specification) {
          await updateSpecification.mutateAsync({ id: specification.id, name: value.name.trim() });
        } else {
          await createSpecification.mutateAsync({ name: value.name.trim() });
          form.reset();
        }

        onSuccess?.();
      } catch (error) {
        setServerError(
          form,
          'name',
          getServerErrorMessage(
            error,
            { 409: 'Характеристика с таким названием уже существует' },
            isEdit
              ? 'Не удалось обновить характеристику, попробуйте позже'
              : 'Не удалось создать характеристику, попробуйте позже',
          ),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup>
        <TextField form={form} name='name' label='Название характеристики' icon={ClipboardPenLine} autoComplete='off' />
        <SubmitButton form={form} className='w-full'>
          {isEdit ? 'Обновить характеристику' : 'Создать характеристику'}
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
