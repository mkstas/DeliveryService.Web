'use client';

import { type FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
  UserCell,
} from '@/common/components';
import { useRoles } from '@/modules/system-roles';
import { useUsers } from '../hooks/queries';
import { RolesDialog } from './roles-dialog';

export const SystemUsersTable: FC = () => {
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const { isLoading: isLoadingRoles } = useRoles();

  if (isLoadingUsers && isLoadingRoles) {
    return <TableSkeleton columns={3} withAvatar />;
  }

  return (
    <div className='border rounded-lg overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-48'>Имя пользователя</TableHead>
            <TableHead className='w-48'>Электронная почта</TableHead>
            <TableHead className='text-right'>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map(user => (
            <TableRow key={user.id}>
              <TableCell>
                <UserCell imageUrl={user.imageUrl} name={user.name} />
              </TableCell>
              <TableCell>
                <span>{user.emailAddress}</span>
              </TableCell>
              <TableCell className='flex items-center gap-2 justify-end'>
                <RolesDialog user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
