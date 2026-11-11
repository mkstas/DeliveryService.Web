'use client';

import { type FC } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSkeleton } from '@/common/components';
import { useCategories } from '../hooks/queries';
import { UpdateCategoryDialog } from './update-category-dialog';

export const SystemCategoriesTable: FC = () => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return <TableSkeleton columns={2} />;
  }

  return (
    <div className='overflow-hidden rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-48'>Название</TableHead>
            <TableHead className='text-right'>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map(category => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell className='flex justify-end gap-2'>
                <UpdateCategoryDialog category={category} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
