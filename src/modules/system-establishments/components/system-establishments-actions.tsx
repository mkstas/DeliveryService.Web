'use client';

import { FC } from 'react';
import { Skeleton } from '@/common/components';
import { useEstablishments } from '../hooks/useEstablishments';
import { CreateEstablishmentDialog } from './create-establishment-dialog';

export const SystemEstablishmentsActions: FC = () => {
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
      <CreateEstablishmentDialog />
    </div>
  );
};
