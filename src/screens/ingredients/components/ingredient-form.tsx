'use client';

import {
  clearServerErrors,
  FormShell,
  getServerErrorMessage,
  setServerError,
  SubmitButton,
  TextField,
} from '@/features/form';
import { useRestaurants } from '@/screens/restaurants';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { type FC } from 'react';
import { LeafyGreenIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { useCreateIngredient, useUpdateIngredient } from '../hooks/mutations';
import type { IngredientWithRestaurant } from '../hooks/queries';

const ingredientFormSchema = z.object({
  name: z.string().trim().min(1, 'Название не может быть пустым').max(256, 'Максимальная длина 256 символов'),
  restaurantId: z.string().min(1, 'Выберите ресторан'),
});

type IngredientFormSchema = z.infer<typeof ingredientFormSchema>;

type IngredientFormProps = {
  ingredient?: IngredientWithRestaurant;
  onSuccess?: () => void;
};

export const IngredientForm: FC<IngredientFormProps> = ({ ingredient, onSuccess }) => {
  const isEdit = ingredient !== undefined;
  const createIngredient = useCreateIngredient();
  const updateIngredient = useUpdateIngredient();
  const { data: restaurants } = useRestaurants();

  const form = useForm({
    defaultValues: {
      name: ingredient?.name ?? '',
      restaurantId: ingredient?.restaurantId ?? '',
    } as IngredientFormSchema,
    validators: {
      onChange: ingredientFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['name']);

      try {
        if (isEdit) {
          await updateIngredient.mutateAsync({
            restaurantId: ingredient.restaurantId,
            ingredientId: ingredient.id,
            data: { name: value.name.trim() },
          });
        } else {
          await createIngredient.mutateAsync({
            restaurantId: value.restaurantId,
            name: value.name.trim(),
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
            { 409: 'Ингредиент с таким названием уже существует' },
            isEdit
              ? 'Не удалось обновить ингредиент, попробуйте позже'
              : 'Не удалось создать ингредиент, попробуйте позже',
          ),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup>
        <form.Field name='restaurantId'>
          {field => {
            const isError =
              field.state.meta.errors.length > 0 && (field.state.meta.isTouched || form.state.isSubmitted);

            return (
              <Field>
                <FieldLabel>Ресторан</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={value => field.handleChange(value ?? '')}
                  disabled={isEdit}
                >
                  <SelectTrigger className='w-full' aria-invalid={isError}>
                    <SelectValue placeholder='Выберите ресторан' />
                  </SelectTrigger>
                  <SelectContent>
                    {restaurants?.map(restaurant => (
                      <SelectItem key={restaurant.id} value={restaurant.id}>
                        {restaurant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isError && (
                  <FieldError errors={field.state.meta.errors.slice(0, 1) as Array<{ message?: string } | undefined>} />
                )}
              </Field>
            );
          }}
        </form.Field>

        <TextField form={form} name='name' label='Название ингредиента' icon={LeafyGreenIcon} autoComplete='off' />
        <SubmitButton form={form} className='w-full'>
          {isEdit ? 'Обновить ингредиент' : 'Создать ингредиент'}
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
