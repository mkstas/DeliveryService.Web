'use client';

import { FC } from 'react';
import { Skeleton } from '@/common/components';
import { usePermissions } from '../hooks/usePermissions';
import { useRoles } from '../hooks/useRoles';
import { CreateRoleDialog } from './create-role-dialog';

export const SystemRolesActions: FC = () => {
  const { isLoading: isLoadingRoles } = useRoles();
  const { isLoading: isLoadingPermissions } = usePermissions();

  if (isLoadingRoles && isLoadingPermissions) {
    return (
      <div className='flex justify-end gap-2'>
        <Skeleton className='h-8 w-36 rounded-lg' />
      </div>
    );
  }

  return (
    <div className='flex justify-end gap-2'>
      <CreateRoleDialog />
    </div>
  );
};
