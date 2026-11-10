'use client';

import { FC } from 'react';
import { Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/common/components';
import { usePermissions } from '../hooks/usePermissions';
import { useRoles } from '../hooks/useRoles';
import { PermissionsDialog } from './permissions-dialog';
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
              <TableHead className='w-48'>
                <Skeleton className='w-24 h-5 rounded-md' />
              </TableHead>
              <TableHead>
                <Skeleton className='w-24 h-5 ml-auto rounded-md' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className='h-5 w-32 rounded-md' />
                </TableCell>
                <TableCell className='flex justify-end gap-2'>
                  <Skeleton className='h-8 w-32 rounded-lg' />
                  <Skeleton className='h-8 w-10 rounded-lg' />
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
            <TableHead className='w-48'>Название</TableHead>
            <TableHead className='text-right'>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles?.map(role => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell className='flex gap-2 justify-end'>
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
