'use client';

import { FC } from 'react';
import { ShieldAlertIcon, UserIcon, UsersIcon } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/components';
import { API_URL } from '@/common/config';
import { useRoles } from '../hooks/useRoles';
import { useUsers } from '../hooks/useUsers';
import { RolesState } from './roles-state';
import { UserRolesPopover } from './user-roles-popover';

export const SystemUsers: FC = () => {
  const { data: users, isPending: isPendingUsers, isError: isUsersError, refetch: refetchUsers } = useUsers();
  const { data: roles, isPending: isPendingRoles, isError: isRolesError } = useRoles();

  if (isPendingUsers) {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-36 rounded-4xl' />
        </div>

        <div className='overflow-hidden rounded-2xl border bg-card'>
          <Table className='table-fixed'>
            <TableHeader>
              <TableRow>
                <TableHead className='w-1/3'>
                  <Skeleton className='h-4 w-24' />
                </TableHead>
                <TableHead className='w-1/3'>
                  <Skeleton className='h-4 w-12' />
                </TableHead>
                <TableHead className='w-1/3'>
                  <Skeleton className='h-4 w-10' />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Skeleton className='size-8 shrink-0 rounded-full' />
                      <Skeleton className='h-4 w-32' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-40' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-6 w-32 rounded-4xl' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (isUsersError) {
    return (
      <RolesState
        icon={ShieldAlertIcon}
        tone='destructive'
        title='Не удалось загрузить пользователей'
        description='Попробуйте повторить запрос.'
        action={{ label: 'Повторить', onClick: () => refetchUsers(), variant: 'outline' }}
      />
    );
  }

  if (!users) {
    return (
      <RolesState
        icon={ShieldAlertIcon}
        title='Недостаточно прав'
        description='У вас нет доступа к списку пользователей.'
      />
    );
  }

  if (users.length === 0) {
    return (
      <RolesState
        icon={UsersIcon}
        title='Пользователей пока нет'
        description='Здесь появятся зарегистрированные пользователи.'
      />
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <Badge variant='secondary'>Пользователей: {users.length}</Badge>
      </div>

      <div className='overflow-hidden rounded-2xl border bg-card'>
        <Table className='table-fixed'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-1/3'>Пользователь</TableHead>
              <TableHead className='w-1/3'>Email</TableHead>
              <TableHead className='w-1/3'>Роли</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell className='font-medium'>
                  <div className='flex min-w-0 items-center gap-3'>
                    <Avatar>
                      {user.imageUrl && (
                        <AvatarImage src={`${API_URL}/static/${user.imageUrl}`} alt={`Avatar ${user.name}`} />
                      )}
                      <AvatarFallback>
                        <UserIcon className='size-4' />
                      </AvatarFallback>
                    </Avatar>
                    <span className='truncate'>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className='text-muted-foreground'>
                  <span className='block truncate'>{user.emailAddress}</span>
                </TableCell>
                <TableCell className='whitespace-normal'>
                  <UserRolesPopover
                    user={user}
                    roles={roles ?? []}
                    isRolesPending={isPendingRoles}
                    isRolesError={isRolesError}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
