'use client';

import { type FC } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSkeleton } from '@/common/components';
import { useIngredients } from '../hooks/queries';
import { UpdateIngredientDialog } from './update-ingredient-dialog';

export const SystemIngredientsTable: FC = () => {
  const { data: ingredients, isLoading } = useIngredients();

  if (isLoading) {
    return <TableSkeleton columns={3} />;
  }

  return (
    <div className='overflow-hidden rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-48'>Название</TableHead>
            <TableHead className='w-48'>Заведение</TableHead>
            <TableHead className='text-right'>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredients?.map(ingredient => (
            <TableRow key={ingredient.id}>
              <TableCell>{ingredient.name}</TableCell>
              <TableCell>{ingredient.establishment.name}</TableCell>
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
