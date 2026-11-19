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
import { useRestaurants } from '@/screens/restaurants';
import type { Dish } from '@/shared/api';
import { FieldGroup } from '@/shared/ui';
import { type FC } from 'react';
import { CoinsIcon, SoupIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { useCreateDish, useUpdateDish } from '../hooks/mutations';

const dishFormSchema = z.object({
  restaurantId: z.string().min(1, 'Выберите ресторан'),
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

type DishFormProps = {
  dish?: Dish;
  onSuccess?: () => void;
};

export const DishForm: FC<DishFormProps> = ({ dish, onSuccess }) => {
  const isEdit = dish !== undefined;
  const createDish = useCreateDish();
  const updateDish = useUpdateDish();
  const { data: restaurants } = useRestaurants();
  const { data: categories } = useCategories();

  const form = useForm({
    defaultValues: {
      restaurantId: dish?.restaurantId ?? '',
      categoryId: dish?.categoryId ?? '',
      name: dish?.name ?? '',
      price: dish ? String(dish.price) : '',
      description: dish?.description ?? '',
    } as DishFormSchema,
    validators: {
      onChange: dishFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['name', 'price']);

      const data = {
        name: value.name.trim(),
        price: Number(value.price.replace(',', '.')),
        description: value.description.trim() || null,
        imageUrl: dish?.imageUrl ?? null,
      };

      try {
        if (dish) {
          await updateDish.mutateAsync({ id: dish.id, ...data });
        } else {
          await createDish.mutateAsync({
            restaurantId: value.restaurantId,
            categoryId: value.categoryId,
            ...data,
          });
          form.reset();
        }

        onSuccess?.();
      } catch (error) {
        setServerError(
          form,
          'name',
          getServerErrorMessage(
            error,
            { 409: 'Блюдо с таким названием уже существует' },
            isEdit ? 'Не удалось обновить блюдо, попробуйте позже' : 'Не удалось создать блюдо, попробуйте позже',
          ),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup>
        {!isEdit && (
          <>
            <SelectField
              form={form}
              name='restaurantId'
              label='Ресторан'
              options={(restaurants ?? []).map(restaurant => ({ value: restaurant.id, label: restaurant.name }))}
              placeholder='Выберите ресторан'
            />
            <SelectField
              form={form}
              name='categoryId'
              label='Категория'
              options={(categories ?? []).map(category => ({ value: category.id, label: category.name }))}
              placeholder='Выберите категорию'
            />
          </>
        )}
        <TextField form={form} name='name' label='Название блюда' icon={SoupIcon} autoComplete='off' />
        <TextField
          form={form}
          name='price'
          label='Цена'
          icon={CoinsIcon}
          inputMode='decimal'
          autoComplete='off'
          placeholder='0.00'
        />
        <TextareaField form={form} name='description' label='Описание' maxLength={2048} />
        <SubmitButton form={form} className='w-full'>
          {isEdit ? 'Обновить блюдо' : 'Создать блюдо'}
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
