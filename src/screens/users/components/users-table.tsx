'use client';

import { type EntityColumn, EntityTable } from '@/features/crud';
import { useRoles } from '@/screens/roles';
import type { User } from '@/shared/api';
import { UserCell } from '@/shared/ui';
import { useUsers } from '../hooks/queries';
import { RolesDialog } from './roles-dialog';

export const UsersTable = ({ search }: { search?: string }) => {
  const { data: users, isLoading: isLoadingUsers } = useUsers(search);
  const { isLoading: isLoadingRoles } = useRoles();

  const columns: EntityColumn<User>[] = [
    {
      header: 'Имя пользователя',
      className: 'w-48',
      cell: user => <UserCell imageUrl={user.imageUrl} name={user.name} />,
    },
    {
      header: 'Электронная почта',
      className: 'w-48',
      cell: user => <span>{user.emailAddress}</span>,
    },
    {
      header: 'Действия',
      className: 'text-right',
      cellClassName: 'flex items-center justify-end gap-2',
      cell: user => <RolesDialog user={user} />,
    },
  ];

  return (
    <EntityTable
      items={users ?? []}
      columns={columns}
      getRowKey={user => user.id}
      isLoading={isLoadingUsers || isLoadingRoles}
      withAvatar
      emptyMessage='Пользователи не найдены'
    />
  );
};
