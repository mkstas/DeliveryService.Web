'use client';

import { type EntityColumn, EntityTable, RemoveDialog, UpdateNamedEntityDialog } from '@/features/crud';
import { FormDialog } from '@/features/form';
import type { Ingredient, Restaurant } from '@/shared/api';
import { ChevronDownIcon } from 'lucide-react';
import { useRemoveRestaurantIngredient, useUpdateRestaurantIngredient } from '../hooks/mutations';
import { ingredientTexts } from '../texts';
import { AddRestaurantIngredientForm } from './add-restaurant-ingredient-form';

type RestaurantIngredientsDialogProps = {
  restaurant: Restaurant;
};

export const RestaurantIngredientsDialog = ({ restaurant }: RestaurantIngredientsDialogProps) => {
  const updateRestaurantIngredient = useUpdateRestaurantIngredient();
  const removeRestaurantIngredient = useRemoveRestaurantIngredient();

  const columns: EntityColumn<Ingredient>[] = [
    {
      header: 'Название',
      cell: ingredient => ingredient.name,
    },
    {
      header: 'Действия',
      className: 'text-right',
      cellClassName: 'flex justify-end gap-2',
      cell: ingredient => (
        <>
          <UpdateNamedEntityDialog
            entity={ingredient}
            texts={ingredientTexts}
            onSave={name =>
              updateRestaurantIngredient.mutateAsync({
                restaurantId: restaurant.id,
                ingredientId: ingredient.id,
                name,
              })
            }
          />
          <RemoveDialog
            title='Удаление ингредиента'
            description={`Ингредиент «${ingredient.name}» будет удалён`}
            ariaLabel='Удалить ингредиент'
            onConfirm={() =>
              removeRestaurantIngredient.mutateAsync({
                restaurantId: restaurant.id,
                ingredientId: ingredient.id,
              })
            }
          />
        </>
      ),
    },
  ];

  return (
    <FormDialog
      trigger={{ text: 'Ингредиенты', trailingIcon: ChevronDownIcon, variant: 'secondary' }}
      title='Ингредиенты ресторана'
      description='Управление списком ингредиентов ресторана'
      contentClassName='sm:max-w-2xl w-full'
    >
      <>
        <AddRestaurantIngredientForm restaurantId={restaurant.id} />
        <EntityTable
          items={restaurant.ingredients}
          columns={columns}
          getRowKey={ingredient => ingredient.id}
          emptyMessage='Ингредиенты не найдены'
        />
      </>
    </FormDialog>
  );
};
