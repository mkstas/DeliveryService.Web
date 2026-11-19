'use client';

import {
  clearServerErrors,
  FormShell,
  getServerErrorMessage,
  SelectField,
  setServerError,
  SubmitButton,
  TextField,
} from '@/features/form';
import { useSpecifications } from '@/screens/specifications';
import { FieldGroup } from '@/shared/ui';
import { type FC } from 'react';
import { ClipboardPenLineIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { useCreateDishSpecification } from '../hooks/mutations';

const addSpecificationFormSchema = z.object({
  specificationId: z.string().min(1, 'Выберите характеристику'),
  value: z.string().trim().min(1, 'Значение не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type AddSpecificationFormSchema = z.infer<typeof addSpecificationFormSchema>;

type AddDishSpecificationFormProps = {
  dishId: string;
};

export const AddDishSpecificationForm: FC<AddDishSpecificationFormProps> = ({ dishId }) => {
  const createDishSpecification = useCreateDishSpecification();
  const { data: specifications } = useSpecifications();

  const form = useForm({
    defaultValues: {
      specificationId: '',
      value: '',
    } as AddSpecificationFormSchema,
    validators: {
      onChange: addSpecificationFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['specificationId', 'value']);

      try {
        await createDishSpecification.mutateAsync({
          dishId,
          specificationId: value.specificationId,
          value: value.value.trim(),
        });
        form.reset();
      } catch (error) {
        setServerError(
          form,
          'value',
          getServerErrorMessage(
            error,
            { 409: 'Такая характеристика уже добавлена' },
            'Не удалось добавить характеристику',
          ),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup className='sm:flex-row sm:items-start sm:gap-3'>
        <SelectField
          form={form}
          name='specificationId'
          options={(specifications ?? []).map(specification => ({
            value: specification.id,
            label: specification.name,
          }))}
          placeholder='Выберите характеристику'
        />
        <TextField form={form} name='value' icon={ClipboardPenLineIcon} placeholder='Значение' autoComplete='off' />
        <SubmitButton form={form} className='max-sm:w-full'>
          Добавить
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
