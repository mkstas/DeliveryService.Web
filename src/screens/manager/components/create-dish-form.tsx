'use client';

import {
  clearServerErrors,
  FormShell,
  getServerErrorMessage,
  SelectField,
  setServerError,
  SubmitButton,
  TextareaField,
  TextField,
} from '@/features/form';
import { useCategories } from '@/screens/categories';
import { FieldGroup } from '@/shared/ui';
import { type FC } from 'react';
import { CoinsIcon, SoupIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { useCreateMyDish } from '../hooks/mutations';

const dishFormSchema = z.object({
  categoryId: z.string().min(1, 'Выберите категорию'),
  name: z.string().trim().min(1, 'Название не может быть пустым').max(256, 'Максимальная длина 256 символов'),
  price: z
    .string()
    .trim()
    .min(1, 'Укажите цену')
    .regex(/^\d+([.,]\d{1,2})?$/, 'Цена должна быть числом с точностью до двух знаков'),
  description: z.string().trim().max(2048, 'Максимальная длина 2048 символов'),
});

type DishFormSchema = z.infer<typeof dishFormSchema>;

type CreateDishFormProps = {
  onSuccess?: () => void;
};

export const CreateDishForm: FC<CreateDishFormProps> = ({ onSuccess }) => {
  const createDish = useCreateMyDish();
  const { data: categories } = useCategories();

  const form = useForm({
    defaultValues: {
      categoryId: '',
      name: '',
      price: '',
      description: '',
    } as DishFormSchema,
    validators: {
      onChange: dishFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['name', 'price']);

      try {
        await createDish.mutateAsync({
          categoryId: value.categoryId,
          name: value.name.trim(),
          price: Number(value.price.replace(',', '.')),
          description: value.description.trim() || null,
          imageUrl: null,
        });
        form.reset();
        onSuccess?.();
      } catch (error) {
        setServerError(
          form,
          'name',
          getServerErrorMessage(
            error,
            { 409: 'Блюдо с таким названием уже существует' },
            'Не удалось создать блюдо, попробуйте позже',
          ),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup>
        <SelectField
          form={form}
          name='categoryId'
          label='Категория'
          options={(categories ?? []).map(category => ({ value: category.id, label: category.name }))}
          placeholder='Выберите категорию'
        />
        <TextField
          form={form}
          name='name'
          label='Название блюда'
          icon={SoupIcon}
          placeholder='Название блюда'
          autoComplete='off'
        />
        <TextField
          form={form}
          name='price'
          label='Цена'
          icon={CoinsIcon}
          inputMode='decimal'
          autoComplete='off'
          placeholder='0.00'
        />
        <TextareaField form={form} name='description' label='Описание' placeholder='Описание блюда' maxLength={2048} />
        <SubmitButton form={form} className='w-full'>
          Создать блюдо
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
