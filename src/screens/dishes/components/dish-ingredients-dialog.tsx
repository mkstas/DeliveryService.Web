'use client';

import { type EntityColumn, EntityTable, RemoveDialog } from '@/features/crud';
import {
  clearServerErrors,
  FormDialog,
  FormShell,
  getServerErrorMessage,
  SelectField,
  setServerError,
  SubmitButton,
} from '@/features/form';
import { useRestaurants } from '@/screens/restaurants';
import type { Dish, DishIngredient } from '@/shared/api';
import { FieldGroup } from '@/shared/ui';
import { type FC } from 'react';
import { ChevronDownIcon, LeafyGreenIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { useAddDishIngredient, useRemoveDishIngredient } from '../hooks/mutations';

const addIngredientFormSchema = z.object({
  ingredientId: z.string().min(1, 'Выберите ингредиент'),
});

type AddIngredientFormSchema = z.infer<typeof addIngredientFormSchema>;

type AddDishIngredientFormProps = {
  dishId: string;
  restaurantId: string;
  usedIngredientIds: string[];
};

const AddDishIngredientForm: FC<AddDishIngredientFormProps> = ({ dishId, restaurantId, usedIngredientIds }) => {
  const addIngredient = useAddDishIngredient();
  const { data: restaurants } = useRestaurants();

  const restaurant = restaurants?.find(item => item.id === restaurantId);
  const availableIngredients = (restaurant?.ingredients ?? []).filter(
    ingredient => !usedIngredientIds.includes(ingredient.id),
  );

  const form = useForm({
    defaultValues: { ingredientId: '' } as AddIngredientFormSchema,
    validators: { onChange: addIngredientFormSchema },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['ingredientId']);

      try {
        await addIngredient.mutateAsync({ dishId, ingredientId: value.ingredientId });
        form.reset();
      } catch (error) {
        setServerError(
          form,
          'ingredientId',
          getServerErrorMessage(error, { 409: 'Такой ингредиент уже добавлен' }, 'Не удалось добавить ингредиент'),
        );
      }
    },
  });

  const hasAvailableIngredients = availableIngredients.length > 0;

  return (
    <div className='flex flex-col gap-2'>
      <FormShell form={form}>
        <FieldGroup className='sm:flex-row sm:items-start sm:gap-3'>
          <SelectField
            form={form}
            name='ingredientId'
            options={availableIngredients.map(ingredient => ({ value: ingredient.id, label: ingredient.name }))}
            placeholder='Выберите ингредиент'
            disabled={!hasAvailableIngredients}
          />
          <SubmitButton form={form} className='max-sm:w-full' disabled={!hasAvailableIngredients}>
            Добавить
          </SubmitButton>
        </FieldGroup>
      </FormShell>
      {!hasAvailableIngredients && (
        <p className='text-sm text-muted-foreground'>Все ингредиенты ресторана уже добавлены в блюдо.</p>
      )}
    </div>
  );
};

export const DishIngredientsDialog: FC<{ dish: Dish }> = ({ dish }) => {
  const removeIngredient = useRemoveDishIngredient();

  const columns: EntityColumn<DishIngredient>[] = [
    {
      header: 'Ингредиент',
      cell: dishIngredient => dishIngredient.name,
    },
    {
      header: 'Действия',
      className: 'text-right',
      cellClassName: 'flex justify-end gap-2',
      cell: dishIngredient => (
        <RemoveDialog
          title='Удаление ингредиента'
          description={`Ингредиент «${dishIngredient.name}» будет удалён из блюда`}
          ariaLabel='Удалить ингредиент из блюда'
          onConfirm={() => removeIngredient.mutateAsync({ dishId: dish.id, dishIngredientId: dishIngredient.id })}
        />
      ),
    },
  ];

  return (
    <FormDialog
      trigger={{ icon: LeafyGreenIcon, trailingIcon: ChevronDownIcon, text: 'Ингредиенты', variant: 'secondary' }}
      title='Ингредиенты блюда'
      description={dish.name}
      contentClassName='sm:max-w-2xl w-full'
    >
      <>
        <AddDishIngredientForm
          dishId={dish.id}
          restaurantId={dish.restaurantId}
          usedIngredientIds={dish.ingredients.map(ingredient => ingredient.ingredientId)}
        />
        <EntityTable
          items={dish.ingredients}
          columns={columns}
          getRowKey={ingredient => ingredient.id}
          emptyMessage='Ингредиенты не добавлены'
        />
      </>
    </FormDialog>
  );
};
