'use client';

import { FC } from 'react';
import { Skeleton } from '@/common/components';
import { CreateIngredientDialog } from './create-ingredient-dialog';
import { useEstablishments } from '@/modules/system-establishments';

export const SystemIngredientsActions: FC = () => {
  const { isLoading } = useEstablishments();

  if (isLoading) {
    return (
      <div className='flex justify-end gap-2'>
        <Skeleton className='h-8 w-36 rounded-lg' />
      </div>
    );
  }

  return (
    <div className='flex justify-end gap-2'>
      <CreateIngredientDialog />
    </div>
  );
};
