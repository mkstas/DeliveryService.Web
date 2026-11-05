'use client';

import { FC } from 'react';
import { Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/common/components';
import { usePermissions } from '../hooks/usePermissions';
import { useRoles } from '../hooks/useRoles';
import { PermissionsPopover } from './permissions-popover';
import { UpdateRoleDialog } from './update-role-dialog';

export const SystemRolesTable: FC = () => {
  const { data: roles, isLoading: isLoadingRoles } = useRoles();
  const { isLoading: isLoadingPermissions } = usePermissions();

  if (isLoadingRoles && isLoadingPermissions) {
    return (
      <div className='border rounded-lg overflow-hidden'>
        <Table className='table-fixed'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-2/5'>
                <Skeleton className='w-28 h-5' />
              </TableHead>
              <TableHead className='w-2/5'>
                <Skeleton className='w-28 h-5' />
              </TableHead>
              <TableHead className='w-1/5'>
                <Skeleton className='w-28 h-5 ml-auto' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className='h-4 w-32' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-40' />
                </TableCell>
                <TableCell className='flex justify-end gap-2'>
                  <Skeleton className='h-9 w-10 rounded-4xl' />
                  <Skeleton className='h-9 w-10 rounded-4xl' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className='border rounded-lg overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-2/5'>Название</TableHead>
            <TableHead className='w-2/5'>Разрешения</TableHead>
            <TableHead className='w-1/5 text-right'>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles?.map(role => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>
                <PermissionsPopover role={role} />
              </TableCell>
              <TableCell className='flex gap-2 justify-end'>
                <UpdateRoleDialog role={role} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
