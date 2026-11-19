'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSkeleton } from '@/shared/ui';
import { type FC } from 'react';
import { useIngredients } from '../hooks/queries';
import { UpdateIngredientDialog } from './update-ingredient-dialog';

type IngredientsTableProps = {
  search?: string;
};

export const IngredientsTable: FC<IngredientsTableProps> = ({ search = '' }) => {
  const { data: ingredients, isLoading } = useIngredients(search);

  if (isLoading) {
    return <TableSkeleton columns={3} />;
  }

  return (
    <div className='overflow-hidden rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-48'>Название</TableHead>
            <TableHead className='w-48'>Ресторан</TableHead>
            <TableHead className='text-right'>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredients?.map(ingredient => (
            <TableRow key={ingredient.id}>
              <TableCell>{ingredient.name}</TableCell>
              <TableCell>{ingredient.restaurantName}</TableCell>
              <TableCell className='flex items-center justify-end gap-2'>
                <UpdateIngredientDialog ingredient={ingredient} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
