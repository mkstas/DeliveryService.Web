'use client';

import { type FC } from 'react';
import { LeafyGreenIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { FieldGroup } from '@/common/components';
import {
  clearServerErrors,
  FormShell,
  getServerErrorMessage,
  setServerError,
  SubmitButton,
  TextField,
} from '@/common/forms';
import { useAddRestaurantIngredient } from '../hooks/mutations';

const addIngredientFormSchema = z.object({
  name: z.string().trim().min(1, 'Название не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type AddIngredientFormSchema = z.infer<typeof addIngredientFormSchema>;

type AddRestaurantIngredientFormProps = {
  restaurantId: string;
};

export const AddRestaurantIngredientForm: FC<AddRestaurantIngredientFormProps> = ({ restaurantId }) => {
  const addRestaurantIngredient = useAddRestaurantIngredient();

  const form = useForm({
    defaultValues: {
      name: '',
    } as AddIngredientFormSchema,
    validators: {
      onChange: addIngredientFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['name']);

      try {
        await addRestaurantIngredient.mutateAsync({ restaurantId, name: value.name.trim() });
        form.reset();
      } catch (error) {
        setServerError(
          form,
          'name',
          getServerErrorMessage(error, { 409: 'Такой ингредиент уже существует' }, 'Не удалось добавить ингредиент'),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup className='sm:flex-row sm:items-start sm:gap-3'>
        <TextField
          form={form}
          name='name'
          icon={LeafyGreenIcon}
          autoComplete='off'
          placeholder='Название ингредиента'
        />
        <SubmitButton form={form} className='max-sm:w-full'>
          Добавить
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
