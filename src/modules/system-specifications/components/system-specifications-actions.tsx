'use client';

import { FC } from 'react';
import { Skeleton } from '@/common/components';
import { useSpecifications } from '../hooks/queries';
import { CreateSpecificationDialog } from './create-specification-dialog';

export const SystemSpecificationsActions: FC = () => {
  const { isLoading } = useSpecifications();

  if (isLoading) {
    return (
      <div className='flex justify-end gap-2'>
        <Skeleton className='h-8 w-36 rounded-lg' />
      </div>
    );
  }

  return (
    <div className='flex justify-end gap-2'>
      <CreateSpecificationDialog />
    </div>
  );
};
