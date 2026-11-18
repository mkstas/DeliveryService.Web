'use client';

import type { User } from '@/common/api';
import { UserCell } from '@/common/components';
import { type EntityColumn, EntityTable } from '@/common/crud';
import { useRoles } from '@/modules/system-roles';
import { useUsers } from '../hooks/queries';
import { RolesDialog } from './roles-dialog';

export const SystemUsersTable = () => {
  const { data: users, isLoading: isLoadingUsers } = useUsers();
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
