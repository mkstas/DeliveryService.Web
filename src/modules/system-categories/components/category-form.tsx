'use client';

import { type FC } from 'react';
import { LayoutGrid } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { type Category } from '@/common/api';
import { FieldGroup } from '@/common/components';
import {
  clearServerErrors,
  FormShell,
  getServerErrorMessage,
  setServerError,
  SubmitButton,
  TextField,
} from '@/common/forms';
import { useCreateCategory, useUpdateCategory } from '../hooks/mutations';

const categoryFormSchema = z.object({
  name: z.string().trim().min(1, 'Название не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type CategoryFormSchema = z.infer<typeof categoryFormSchema>;

type CategoryFormProps = {
  category?: Category;
  onSuccess?: () => void;
};

export const CategoryForm: FC<CategoryFormProps> = ({ category, onSuccess }) => {
  const isEdit = category !== undefined;
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const form = useForm({
    defaultValues: {
      name: category?.name ?? '',
    } as CategoryFormSchema,
    validators: {
      onChange: categoryFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['name']);

      try {
        if (category) {
          await updateCategory.mutateAsync({ id: category.id, name: value.name.trim() });
        } else {
          await createCategory.mutateAsync({ name: value.name.trim() });
          form.reset();
        }

        onSuccess?.();
      } catch (error) {
        setServerError(
          form,
          'name',
          getServerErrorMessage(
            error,
            { 409: 'Категория с таким названием уже существует' },
            isEdit
              ? 'Не удалось обновить категорию, попробуйте позже'
              : 'Не удалось создать категорию, попробуйте позже',
          ),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup>
        <TextField form={form} name='name' label='Название категории' icon={LayoutGrid} autoComplete='off' />
        <SubmitButton form={form} className='w-full'>
          {isEdit ? 'Обновить категорию' : 'Создать категорию'}
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
