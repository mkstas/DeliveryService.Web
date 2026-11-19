'use client';

import { type EntityColumn, EntityTable, RemoveDialog } from '@/features/crud';
import type { Ingredient } from '@/shared/api';
import { useMemo } from 'react';
import { useRemoveMyRestaurantIngredient, useUpdateMyRestaurantIngredient } from '../hooks/mutations';
import { useMyRestaurant } from '../hooks/queries';
import { EditIngredientDialog } from './edit-ingredient-dialog';

type IngredientsTableProps = {
  search?: string;
};

export const IngredientsTable = ({ search }: IngredientsTableProps) => {
  const { data: restaurant, isLoading } = useMyRestaurant();
  const updateIngredient = useUpdateMyRestaurantIngredient();
  const removeIngredient = useRemoveMyRestaurantIngredient();

  const ingredients = useMemo(() => {
    const all = restaurant?.ingredients ?? [];
    const pattern = (search ?? '').trim().toLowerCase();

    return pattern.length === 0 ? all : all.filter(ingredient => ingredient.name.toLowerCase().includes(pattern));
  }, [restaurant, search]);

  const columns: EntityColumn<Ingredient>[] = [
    {
      header: 'Название',
      cell: ingredient => ingredient.name,
    },
    {
      header: 'Действия',
      className: 'text-right',
      cellClassName: 'flex items-center justify-end gap-2',
      cell: ingredient => (
        <>
          <EditIngredientDialog
            ingredient={ingredient}
            onSave={name => updateIngredient.mutateAsync({ ingredientId: ingredient.id, name })}
          />
          <RemoveDialog
            title='Удаление ингредиента'
            description={`Ингредиент «${ingredient.name}» будет удалён`}
            ariaLabel='Удалить ингредиент'
            onConfirm={() => removeIngredient.mutateAsync(ingredient.id)}
          />
        </>
      ),
    },
  ];

  return (
    <EntityTable
      items={ingredients}
      columns={columns}
      getRowKey={ingredient => ingredient.id}
      isLoading={isLoading}
      emptyMessage='Ингредиенты не найдены'
    />
  );
};
