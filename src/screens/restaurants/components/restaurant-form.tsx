'use client';

import {
  clearServerErrors,
  FormShell,
  getServerErrorMessage,
  setServerError,
  SubmitButton,
  TextField,
} from '@/features/form';
import type { Restaurant } from '@/shared/api';
import { FieldGroup } from '@/shared/ui';
import { type FC } from 'react';
import { MapPinIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { useCreateRestaurant, useUpdateRestaurant } from '../hooks/mutations';

const restaurantFormSchema = z.object({
  name: z.string().trim().min(1, 'Название не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type RestaurantFormSchema = z.infer<typeof restaurantFormSchema>;

type RestaurantFormProps = {
  restaurant?: Restaurant;
  onSuccess?: () => void;
};

export const RestaurantForm: FC<RestaurantFormProps> = ({ restaurant, onSuccess }) => {
  const isEdit = restaurant !== undefined;
  const createRestaurant = useCreateRestaurant();
  const updateRestaurant = useUpdateRestaurant();

  const form = useForm({
    defaultValues: {
      name: restaurant?.name ?? '',
    } as RestaurantFormSchema,
    validators: {
      onChange: restaurantFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['name']);

      const data = {
        name: value.name.trim(),
        imageUrl: restaurant?.imageUrl ?? null,
      };

      try {
        if (restaurant) {
          await updateRestaurant.mutateAsync({ id: restaurant.id, ...data });
        } else {
          await createRestaurant.mutateAsync(data);
          form.reset();
        }

        onSuccess?.();
      } catch (error) {
        setServerError(
          form,
          'name',
          getServerErrorMessage(
            error,
            { 409: 'Ресторан с таким названием уже существует' },
            isEdit ? 'Не удалось обновить ресторан, попробуйте позже' : 'Не удалось создать ресторан, попробуйте позже',
          ),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup>
        <TextField form={form} name='name' label='Название ресторана' icon={MapPinIcon} autoComplete='off' />
        <SubmitButton form={form} className='w-full'>
          {isEdit ? 'Обновить ресторан' : 'Создать ресторан'}
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
