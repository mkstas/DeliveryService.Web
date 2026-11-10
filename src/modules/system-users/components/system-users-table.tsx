'use client';

import { FC } from 'react';
import { UserIcon } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/components';
import { getUserImageUrl } from '@/common/config';
import { useRoles } from '@/modules/system-roles';
import { useUsers } from '../hooks/useUsers';
import { RolesDialog } from './roles-dialog';

export const SystemUsersTable: FC = () => {
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const { isLoading: isLoadingRoles } = useRoles();

  if (isLoadingUsers && isLoadingRoles) {
    return (
      <div className='border rounded-lg overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-48'>
                <Skeleton className='w-24 h-5 rounded-md' />
              </TableHead>
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
                  <div className='flex items-center gap-2'>
                    <Skeleton className='size-8 rounded-full' />
                    <Skeleton className='h-5 w-32 rounded-md' />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className='h-5 w-32 rounded-md' />
                </TableCell>
                <TableCell className='flex justify-end gap-2'>
                  <Skeleton className='h-8 w-32 rounded-lg' />
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
            <TableHead className='w-48'>Имя пользователя</TableHead>
            <TableHead className='w-48'>Электронная почта</TableHead>
            <TableHead className='text-right'>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map(user => (
            <TableRow key={user.id}>
              <TableCell>
                <div className='flex items-center gap-3'>
                  <Avatar>
                    {user.imageUrl && <AvatarImage src={getUserImageUrl(user.imageUrl)} alt={`Аватар ${user.name}`} />}
                    <AvatarFallback>
                      <UserIcon className='size-4' />
                    </AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </div>
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
