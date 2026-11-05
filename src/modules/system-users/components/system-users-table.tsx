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
import { RolesPopover } from './roles-popover';

export const SystemUsersTable: FC = () => {
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const { isLoading: isLoadingRoles } = useRoles();

  if (isLoadingUsers && isLoadingRoles) {
    return (
      <div className='border rounded-lg overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-2/5'>
                <Skeleton className='w-32 h-5' />
              </TableHead>
              <TableHead className='w-2/5'>
                <Skeleton className='w-28 h-5' />
              </TableHead>
              <TableHead className='w-1/5'>
                <Skeleton className='w-16 h-5' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='size-8 rounded-full' />
                    <Skeleton className='h-4 w-32' />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-40' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-5 w-40' />
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
            <TableHead className='w-2/5'>Имя пользователя</TableHead>
            <TableHead className='w-2/5'>Электронная почта</TableHead>
            <TableHead className='w-1/5'>Роли</TableHead>
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
              <TableCell>{<RolesPopover user={user} />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
