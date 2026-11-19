'use client';

import {
  clearServerErrors,
  FormDialog,
  FormShell,
  getServerErrorMessage,
  setServerError,
  SubmitButton,
  TextField,
} from '@/features/form';
import type { Restaurant } from '@/shared/api';
import { type FC } from 'react';
import { MapPinIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { useUpdateMyRestaurant } from '../hooks/mutations';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Название не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type FormSchema = z.infer<typeof formSchema>;

type EditRestaurantFormProps = {
  restaurant: Restaurant;
  onSuccess: () => void;
};

const EditRestaurantForm: FC<EditRestaurantFormProps> = ({ restaurant, onSuccess }) => {
  const updateRestaurant = useUpdateMyRestaurant();

  const form = useForm({
    defaultValues: { name: restaurant.name } as FormSchema,
    validators: { onChange: formSchema },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['name']);

      try {
        await updateRestaurant.mutateAsync({ name: value.name.trim(), imageUrl: restaurant.imageUrl });
        onSuccess();
      } catch (error) {
        setServerError(
          form,
          'name',
          getServerErrorMessage(
            error,
            { 409: 'Ресторан с таким названием уже существует' },
            'Не удалось обновить заведение, попробуйте позже',
          ),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <TextField form={form} name='name' label='Название заведения' icon={MapPinIcon} autoComplete='off' />
      <div className='mt-3 flex justify-end'>
        <SubmitButton form={form}>Сохранить</SubmitButton>
      </div>
    </FormShell>
  );
};

export const EditRestaurantDialog: FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
  return (
    <FormDialog
      trigger={{ icon: MapPinIcon, text: 'Редактировать', variant: 'secondary' }}
      title='Редактирование заведения'
      description='Измените название заведения'
    >
      {close => <EditRestaurantForm restaurant={restaurant} onSuccess={close} />}
    </FormDialog>
  );
};
