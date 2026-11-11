'use client';

import { FC } from 'react';
import { Skeleton } from '@/common/components';
import { useCategories } from '../hooks/queries';
import { CreateCategoryDialog } from './create-category-dialog';

export const SystemCategoriesActions: FC = () => {
  const { isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className='flex justify-end gap-2'>
        <Skeleton className='h-8 w-36 rounded-lg' />
      </div>
    );
  }

  return (
    <div className='flex justify-end gap-2'>
      <CreateCategoryDialog />
    </div>
  );
};
