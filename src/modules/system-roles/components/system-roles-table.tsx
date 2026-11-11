'use client';

import { type FC } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSkeleton } from '@/common/components';
import { usePermissions, useRoles } from '../hooks/queries';
import { PermissionsDialog } from './permissions-dialog';
import { UpdateRoleDialog } from './update-role-dialog';

export const SystemRolesTable: FC = () => {
  const { data: roles, isLoading: isLoadingRoles } = useRoles();
  const { isLoading: isLoadingPermissions } = usePermissions();

  if (isLoadingRoles && isLoadingPermissions) {
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
          {roles?.map(role => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell className='flex justify-end gap-2'>
                <PermissionsDialog role={role} />
                <UpdateRoleDialog role={role} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
