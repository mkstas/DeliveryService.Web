'use client';

import { type FC, type ReactNode } from 'react';
import { Skeleton } from '@/common/components';

type ActionsBarProps = {
  isLoading?: boolean;
  children: ReactNode;
};

export const ActionsBar: FC<ActionsBarProps> = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <div className='flex justify-end gap-2'>
        <Skeleton className='h-8 w-36 rounded-lg' />
      </div>
    );
  }

  return <div className='flex justify-end gap-2'>{children}</div>;
};
